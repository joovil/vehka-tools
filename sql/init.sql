CREATE DATABASE vehka;

\c vehka
CREATE TABLE minutes(
  id serial PRIMARY KEY,
  filename text,
  blob_url text,
  number integer,
  created date
);

