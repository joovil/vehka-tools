import { Database } from "@/types";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT!),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
