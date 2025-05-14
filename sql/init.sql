CREATE DATABASE vehka;

\c vehka

CREATE TABLE minutes (
	id SERIAL PRIMARY KEY,
	blob_url TEXT,
	minutes_number INTEGER,
	createad_date DATE
);

CREATE TABLE expenses (
	id SERIAL PRIMARY KEY,
	blob_url TEXT,
	amount NUMERIC(10, 2)
);

CREATE TABLE minutes_expenses (
	id SERIAL PRIMARY KEY,
	minutes_id INTEGER REFERENCES minutes(id),
	expenses_id INTEGER REFERENCES expenses(id)
);

CREATE TABLE receipts (
	id SERIAL PRIMARY KEY,
	blob_url TEXT,
	expense_id 	INTEGER REFERENCES expenses(id)
);