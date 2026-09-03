import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // db_data is the Postgres volume from compose.yml and is root-owned, which
  // makes eslint fail with EACCES when the local database has been started.
  { ignores: ["db_data/**", ".next/**", "node_modules/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default config;
