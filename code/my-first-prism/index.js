const {Prism} = require('@optics/prism');
const {PostgreSQL} = require('@optics/prism/source');
const action = require('@optics/prism/action');

const pgPromise = require('pg-promise');
const {Server} = require('hapi');

/**
 * Create a Hapi server instance that listens on port 8080.
 *
 * Full debug logging is also enabled to offer some visibility into what's happening.
 * You generally wouldn't want to enable this in production.
 */
const server = new Server({
  debug: {
	  log: '*',
	  request: '*'
  }
});

server.connection({
  port: 8080,
});

// Create a pg-promise connection
const db = pgPromise()({
  host: 'localhost',
  user: 'my_first_prism_user',
  password: 'my-super-secret-password',
  database: 'my_first_prism_db'
});

// Create a Prism data source that uses the pg-promise connection
const source = new PostgreSQL(db);

/**
 * Register the Prism plugin with the Hapi instance.
 *
 * The `secure: false` option explicitly disables security features for the sake
 * of brevity in this example
 */
server.register({
  register: Prism,
  options: {
    secure: false
  }
}).then(() => {
  /**
   * Create a Prism resource that uses our PostgreSQL data source to describe
   * the 'tasks' table.
   *
   * This description includes a JSON Schema document, a list of the Primary
   * Keys in use, and any relationships (belongsTo or hasMany) to other
   * Resources.
   */
  const tasks = {
    source,

    name: 'tasks',

    schema: {
      $schema: 'http://json-schema.org/draft-04/schema#',
      title: 'tasks',
      type: 'object',
      required: ['title'],
      properties: {
        id: {
          type: 'number',
          readOnly: true
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        complete: {
          type: 'boolean'
        }
      }
    },

    primaryKeys: ['id'],

    relationships: {
      belongsTo: [],
      has: []
    }
  };

  /**
   * Allow simple CRUD behaviour by attaching some Actions to the 'tasks'
   * resource
   */
  server.plugins.prism.registerAction([
    new action.CreateItem(tasks),
    new action.ReadItem(tasks),
    new action.ReadCollection(tasks),
    new action.UpdateItem(tasks),
    new action.DeleteItem(tasks)
  ]);

  // Finally, start the Hapi server
  return server.start();
}).catch(err => {
  // Dump error messages to console
  console.error(err);
});

