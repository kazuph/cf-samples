import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const todos = sqliteTable("todos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	description: text("description").notNull(),
	completed: integer("completed", { mode: "boolean" }).default(false),
	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(strftime('%s', 'now'))`,
	),
});

export const insertTodoSchema = createInsertSchema(todos);
export const selectTodoSchema = createSelectSchema(todos);

export const createTodoSchema = insertTodoSchema.extend({
	description: z
		.string()
		.min(1, "Description is required")
		.max(100, "Description must be 100 characters or less"),
});

export const updateTodoSchema = z.object({
	id: z.coerce.number(),
	completed: z.boolean(),
});

export const deleteTodoSchema = z.object({
	id: z.coerce.number(),
});
