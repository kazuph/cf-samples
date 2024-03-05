import * as dotenv from "dotenv";

// 環境に応じて.envファイルを読み込む
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env" });

export default {
  schema: "./app/db/schema.ts",
  out: "./db/migrations",
  driver: process.env.DB_DRIVER,
  dbCredentials: process.env.DB_DRIVER === "turso" ? {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
  } : {
    database: process.env.DB_PATH as string,
  },
};
