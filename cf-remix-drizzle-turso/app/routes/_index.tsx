import type { MetaFunction, ActionFunction } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
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

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const nickname = formData.get("nickname");
  const name = formData.get("name");

  if (typeof nickname !== "string" || nickname.length === 0) {
    return { error: "Nickname is required" };
  }

  if (typeof name !== "string" || name.length === 0) {
    return { error: "Name is required" };
  }

  const db = DB(context);

  try {
    await db.insert(users).values({ nickname, name }).execute();
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: users.nickname")) {
      return { error: "Nickname must be unique" };
    }
    throw error;
  }

  return null;
};

export default function Index() {
  const { allUsers } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <Form method="post">
        <input type="text" name="nickname" placeholder="Enter nickname" />
        <input type="text" name="name" placeholder="Enter name" />
        <button type="submit">Add User</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>{user.id}: {user.name} ({user.nickname})</li>
        ))}
      </ul>
    </div>
  );
}
