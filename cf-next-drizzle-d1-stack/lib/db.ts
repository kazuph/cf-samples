import type { Context } from "hono";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";

export const getDb = (c: Context) => {
	const d1 = getRequestContext().env.DB;
	return drizzle(d1);
};
