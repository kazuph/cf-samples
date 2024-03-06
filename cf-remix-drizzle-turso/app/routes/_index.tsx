import type { MetaFunction } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { DB } from "../db/db";
import { users } from '../db/schema';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader: LoaderFunction = async ({ context }: LoaderFunctionArgs) => {
  const db = DB(context);
  const allUsers = await db.select().from(users).all();

  return {
    allUsers
  };
};

export default function Index() {
  const { allUsers } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
