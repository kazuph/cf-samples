import { and, eq, gt } from "drizzle-orm";
import type { DrizzleD1Database, D1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";

// contextの構造が変わったため、新しい構造に対応させます。
const contextWithDb = (
	context: Record<string, unknown>,
): context is { cloudflare: { env: { DB: D1Database } } } => {
	return (
		"cloudflare" in context &&
		"env" in context.cloudflare &&
		"DB" in context.cloudflare.env
	);
};

export const getDbFromContext = (
	context: Record<string, unknown>,
): DrizzleD1Database => {
	if (!contextWithDb(context)) {
		throw new Error("No database in context");
	}

	return drizzle(context.cloudflare.env.DB);
};
