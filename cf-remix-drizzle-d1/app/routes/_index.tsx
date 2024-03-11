import type { MetaFunction } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '../db/schema';
type User = InferSelectModel<typeof users>;

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const db = drizzle(context.cloudflare.env.DB);
  const res = await db.select().from(users).all() as User[];

  return { users: res }
};


export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
            rel="noreferrer"
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
