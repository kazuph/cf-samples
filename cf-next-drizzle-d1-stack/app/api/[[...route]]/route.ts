import { getRequestContext } from "@cloudflare/next-on-pages";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import {
	todos,
	createTodoSchema,
	updateTodoSchema,
	deleteTodoSchema,
} from "@/app/schema";

export const runtime = "edge";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

const getDb = (c: any) => {
	const d1 = getRequestContext().env.DB;
	return drizzle(d1);
};

app.get("/todos", async (c) => {
	const db = getDb(c);
	const results = await db.select().from(todos).all();
	return c.json(results);
});

app.post("/todos", zValidator("json", createTodoSchema), async (c) => {
	const db = getDb(c);
	const { description } = c.req.valid("json");
	const result = await db.insert(todos).values({ description }).returning();
	return c.json(result[0]);
});

app.put(
	"/todos/:id/toggle",
	zValidator("json", updateTodoSchema),
	async (c) => {
		const db = getDb(c);
		const { id, completed } = c.req.valid("json");
		const result = await db
			.update(todos)
			.set({ completed })
			.where(eq(todos.id, id))
			.returning();
		return c.json(result[0]);
	},
);

app.delete("/todos/:id", zValidator("param", deleteTodoSchema), async (c) => {
	const db = getDb(c);
	const { id } = c.req.valid("param");
	await db.delete(todos).where(eq(todos.id, id));
	return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
