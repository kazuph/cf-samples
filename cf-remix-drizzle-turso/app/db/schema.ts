import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { uuidv7 } from "uuidv7";

export const users = sqliteTable("users", {
	id: text("id").primaryKey().$defaultFn(uuidv7),
	email: text("email").unique(),
	nickname: text("nickname").notNull().unique(),
	name: text("name").notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
