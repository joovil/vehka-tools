import "./envConfig.js";

import { sql } from "kysely";
import { after, before } from "node:test";
import { db } from "../../database.js";

before(async () => {
  console.log("Clearing db");
  await sql`TRUNCATE TABLE minutes, tenant_committees RESTART IDENTITY CASCADE`.execute(
    db,
  );
});

after(async () => {
  console.log("Cleaning up after tests");
  await sql`TRUNCATE TABLE minutes, tenant_committees RESTART IDENTITY CASCADE`.execute(
    db,
  );
  await db.destroy();
});
