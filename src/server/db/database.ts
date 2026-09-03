import { Database } from "@/types";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

// On Vercel, Neon injects DATABASE_URL and connections go through the pooled
// (-pooler) endpoint, so keep the per-instance pool small. Locally we fall back
// to the discrete DB_* vars used by compose.yml.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true },
      max: 3,
    })
  : new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: parseInt(process.env.DB_PORT!),
      max: 10,
    });

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
