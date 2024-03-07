import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { v4 as uuidv4 } from 'uuid';
import { users } from '../app/db/schema';

import * as dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".dev.vars" });

// 環境変数からデータベースの設定を読み込む
const DB_DRIVER = process.env.DB_DRIVER || "sqlite"; // デフォルトはsqlite

let db: ReturnType<typeof drizzle>;

if (DB_DRIVER === "turso") {
  // Tursoの設定
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  });
  console.log({DB_DRIVER})
  db = drizzle(client);
} else {
  // SQLite（ローカル）の設定
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
  });
  console.log({DB_DRIVER})
  db = drizzle(client);
}

async function insertUser() {
  try {
    const newUser = await db.insert(users).values({
      id: uuidv4(), // UUIDを生成してidとして使用
      name: '新しいユーザー',
      email: `newuser-${uuidv4()}@example.com`,
    }).returning(); // SQLiteを使用している場合、挿入された行を返す

    console.log('新しいユーザーを追加しました:', newUser);
  } catch (error) {
    console.error('ユーザーの追加中にエラーが発生しました:', error);
  }
}

insertUser();
