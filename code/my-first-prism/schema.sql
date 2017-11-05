CREATE DATABASE my_first_prism_db;
CREATE USER my_first_prism_user WITH PASSWORD 'my-super-secret-password';
GRANT ALL PRIVILEGES ON DATABASE my_first_prism_db TO my_first_prism_user;

\c my_first_prism_db;

CREATE TABLE tasks (
  id serial,
  title character varying(255) NOT NULL,
  description character varying(255),
  complete boolean NOT NULL DEFAULT false,
  PRIMARY KEY (id)
);

ALTER TABLE tasks OWNER TO my_first_prism_user;
