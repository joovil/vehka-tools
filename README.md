Set of tools to help with the workflow of HOAS tenant committees

## Deployment

Deployed to Vercel at https://vehkatools.joovil.dev, building from `main`.

- **Database:** Neon Postgres, attached through the Vercel Marketplace. It injects
  `DATABASE_URL`; `src/server/db/database.ts` uses it (with SSL and a small pool)
  and falls back to the `DB_*` vars from `compose.yml` locally.
  Apply `sql/init.sql` to a new database, skipping its first two lines
  (`CREATE DATABASE` / `\c`) — Neon already provides the database.
- **File storage:** Vercel Blob, attached through the Vercel dashboard. It injects
  `BLOB_READ_WRITE_TOKEN`. Uploads go through `POST /api/minutes`, which is subject
  to Vercel's 4.5 MB request body limit.
- **Secrets:** set `AUTH_SECRET` and `ADMIN_PASS` in the Vercel project settings.
  See `.env.example` for the full list of variables.
- **DNS:** `vehkatools` is a `CNAME` to `cname.vercel-dns.com` in Cloudflare, with
  the proxy disabled (grey cloud) so Vercel can issue the certificate.

Creating the first committee, once deployed:

```bash
curl -X POST https://vehkatools.joovil.dev/api/committees \
  -H 'Content-Type: application/json' \
  -d '{"committeeName":"<name>","password":"<password>","adminPassword":"<ADMIN_PASS>"}'
```

`Dockerfile.prod` and `output: "standalone"` are still there for self-hosting; the
standalone output is disabled automatically when building on Vercel.
