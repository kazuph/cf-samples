import * as dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".dev.vars" });
console.log({
  env: process.env.NODE_ENV,
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export default {
  schema: "./app/db/schema.ts",
  out: "./db/migrations",
  driver: process.env.DB_DRIVER as string,
  dbCredentials: process.env.DB_DRIVER === "turso" ? { // prod = turso, dev = libsql
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  } : {
    url: process.env.TURSO_DATABASE_URL as string,
  },
};
