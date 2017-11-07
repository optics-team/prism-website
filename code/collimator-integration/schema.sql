CREATE DATABASE collimator_integration_db;
CREATE USER collimator_integration_user WITH PASSWORD 'my-super-secret-password';
GRANT ALL PRIVILEGES ON DATABASE collimator_integration_db TO collimator_integration_user;

\c collimator_integration_db;

CREATE TABLE users (
  id serial,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tasks (
  id serial,
  owner_id integer REFERENCES users (id),
  title character varying(255) NOT NULL,
  description character varying(255),
  complete boolean NOT NULL DEFAULT false,
  PRIMARY KEY (id)
);

ALTER TABLE users OWNER TO collimator_integration_user;
ALTER TABLE tasks OWNER TO collimator_integration_user;
