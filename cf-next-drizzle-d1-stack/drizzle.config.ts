import type { Config } from "drizzle-kit";

export default {
	dialect: "sqlite",
	schema: "./app/schema.ts",
	out: "./drizzle/migrations",
	driver: "d1-http",
} satisfies Config;
