import { createClient } from "@libsql/client/http";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/libsql";

export const DB = (context: AppLoadContext) => {
	return drizzle(turso(context));
};

const turso = (context: AppLoadContext) => {
	const env = context.cloudflare.env as Env;
	console.log({ env });

	if (env.DB_DRIVER === "turso") {
		return createClient({
			url: env.TURSO_DATABASE_URL,
			authToken: env.TURSO_AUTH_TOKEN,
		});
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return createClient({
			url: env.TURSO_DATABASE_URL,
		});
	}
};
