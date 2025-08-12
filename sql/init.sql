CREATE DATABASE vehka;

\c vehka
CREATE TABLE tenant_committees(
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE minutes(
  id serial PRIMARY KEY,
  filename text,
  blob_url text,
  number text,
  created date,
  tenant_committee_id integer REFERENCES tenant_committees(id)
);

