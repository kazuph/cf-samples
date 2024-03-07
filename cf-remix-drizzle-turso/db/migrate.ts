import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".dev.vars" });

// 環境変数からデータベースの設定を読み込む
const DB_DRIVER = process.env.DB_DRIVER || "libsql";

let db: ReturnType<typeof drizzle>;

console.log({
  env: process.env.NODE_ENV,
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

if (DB_DRIVER === "turso") {
  // Tursoの設定
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  });
  db = drizzle(client);
} else {
  // SQLite（ローカル）の設定
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
  });
  db = drizzle(client);
}

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "db/migrations",
    });
    console.log("Tables migrated!");
    process.exit(0);
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();
