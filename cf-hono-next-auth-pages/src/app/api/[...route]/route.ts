import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "../auth/[...nextauth]/auth";

const app = new Hono().basePath("/api");

const route = app.get("/hello", async (c) => {
  const session = await auth();
  console.log(session?.user);
  const name = session?.user?.name ?? "John Doe";
  const image = session?.user?.image ?? "https://via.placeholder.com/150";
  return c.jsonT({ name, image });
});

export const GET = handle(app);
export type AppType = typeof route;
