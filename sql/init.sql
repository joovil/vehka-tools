CREATE DATABASE vehka;

\c vehka
CREATE TABLE committees(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  password text NOT NULL
);

CREATE TABLE minutes(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  filename text,
  blob_url text,
  number text,
  created date,
  committee integer REFERENCES committees(id)
);

