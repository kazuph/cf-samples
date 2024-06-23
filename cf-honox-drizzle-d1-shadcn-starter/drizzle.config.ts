import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	schema: "./app/schema.ts",
	out: "./drizzle/migrations",
});
