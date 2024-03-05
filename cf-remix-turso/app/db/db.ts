import { createClient } from "@libsql/client/http";
import { AppLoadContext } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/libsql";

export const DB = (context: AppLoadContext) => {
	return drizzle(turso(context))
}

const turso = (context: AppLoadContext) => {
	const env = context.cloudflare.env as Env
	console.log({env})

	if (env.DB_DRIVER == "turso") {
		return createClient({
			url: env.TURSO_DATABASE_URL,
			authToken: env.TURSO_AUTH_TOKEN,
		});
	} else {
		return createClient({
			url: env.TURSO_DATABASE_URL,
		});
	}
}
