CREATE DATABASE vehka;

\c vehka
CREATE TABLE committees(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL UNIQUE CHECK (char_length(name) >= 3),
  password_hash text NOT NULL CHECK (char_length(password_hash) >= 3)
);

CREATE TABLE minutes(
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  filename text,
  blob_url text,
  number text,
  created date,
  committee_id integer REFERENCES committees(id)
);

