CREATE DATABASE vehka;

\c vehka

CREATE TABLE minutes (
	id SERIAL PRIMARY KEY,
	blob_url TEXT,
	minutes_number INTEGER,
	created_date DATE
);