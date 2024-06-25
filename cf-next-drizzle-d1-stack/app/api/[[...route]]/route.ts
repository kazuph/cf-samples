import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { secureHeaders } from "hono/secure-headers";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import {
	todos,
	createTodoSchema,
	updateToggleTodoSchema,
	deleteTodoSchema,
	updateTodoJsonSchema,
	updateTodoParamSchema,
} from "@/app/schema";

export const runtime = "edge";

type Bindings = {
	DB: D1Database;
};

const getDb = (c: any) => {
	const d1 = getRequestContext().env.DB;
	return drizzle(d1);
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(csrf());
app.use(secureHeaders());
app.use("*", async (c, next) => {
	const userAgent = c.req.header("User-Agent");
	if (!userAgent || !userAgent.includes("Mozilla")) {
		return c.text("Access denied", 403);
	}
	await next();
});

const route = app
	.get("/todos", async (c) => {
		const db = getDb(c);
		const results = await db.select().from(todos).all();
		return c.json(results);
	})
	.post("/todos", zValidator("json", createTodoSchema), async (c) => {
		const db = getDb(c);
		const { description } = c.req.valid("json");
		const result = await db.insert(todos).values({ description }).returning();
		return c.json(result[0]);
	})
	.put(
		"/todos/:id/toggle",
		zValidator("param", updateTodoParamSchema),
		zValidator("json", updateToggleTodoSchema),
		async (c) => {
			const db = getDb(c);
			const { id } = c.req.valid("param");
			const { completed } = c.req.valid("json");
			const result = await db
				.update(todos)
				.set({ completed })
				.where(eq(todos.id, id))
				.returning();
			return c.json(result[0]);
		},
	)
	.put(
		"/todos/:id",
		zValidator("param", updateTodoParamSchema),
		zValidator("json", updateTodoJsonSchema),
		async (c) => {
			const db = getDb(c);
			const { id } = c.req.valid("param");
			const { description } = c.req.valid("json");
			const result = await db
				.update(todos)
				.set({ description })
				.where(eq(todos.id, id))
				.returning();
			return c.json(result[0]);
		},
	)
	.delete("/todos/:id", zValidator("param", deleteTodoSchema), async (c) => {
		const db = getDb(c);
		const { id } = c.req.valid("param");
		await db.delete(todos).where(eq(todos.id, id));
		return c.json({ success: true });
	});

export const GET = handle(route);
export const POST = handle(route);
export const PUT = handle(route);
export const DELETE = handle(route);

export type AppType = typeof route;
