import { Database } from "@/types";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

// Neon/Vercel integrations differ on which name they inject.
const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL;

if (!connectionString && process.env.VERCEL) {
  // Without this the DB_* fallback below silently dials localhost:5432 and
  // every query dies with ECONNREFUSED instead of naming the real problem.
  throw new Error(
    "No Postgres connection string found. Attach the Neon database to this " +
      "Vercel project and redeploy so DATABASE_URL is injected.",
  );
}

// On Vercel the connection goes through Neon's pooled (-pooler) endpoint, so
// keep the per-instance pool small. Locally we fall back to the discrete DB_*
// vars used by compose.yml.
const pool = connectionString
  ? new Pool({
      connectionString,
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
