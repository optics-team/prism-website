const {Prism} = require('@optics/prism');
const {PostgreSQL} = require('@optics/prism/source');
const action = require('@optics/prism/action');
const {inspect} = require('collimator');

const pgPromise = require('pg-promise');
const {Server} = require('hapi');

const server = new Server({
  debug: {
    log: '*',
    request: '*'
  }
});

server.connection({
  port: 8080
});

// Create a pg-promise connection
const db = pgPromise()({
  host: 'localhost',
  user: 'collimator_integration_user',
  password: 'my-super-secret-password',
  database: 'collimator_integration_db'
});

const source = new PostgreSQL(db);

server.register({
  register: Prism,
  options: {
    secure: false
  }
}).then(() => {
  // Use Collimator's 'inspect' function to get the full schema of the database
  return inspect(db);
}).then(schema => {
  /**
   * Iterate over each table in the schema, create a Resource object from it,
   * and bind CRUD actions to it
   */
  schema.tables.forEach(table => {
    const resource = Object.assign(table, {source});

    server.plugins.prism.registerAction([
      new action.CreateItem(resource),
      new action.ReadItem(resource),
      new action.ReadCollection(resource),
      new action.UpdateItem(resource),
      new action.DeleteItem(resource)
    ]);
  });

  return server.start();
}).catch(err => {
  console.error(err);
});

