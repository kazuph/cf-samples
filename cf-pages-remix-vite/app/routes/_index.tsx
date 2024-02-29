import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App!!!" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function loader({
  context,
}: LoaderFunctionArgs) {
  const { A2KANA } = context.cloudflare.env;
  const value = await A2KANA.get("my-key");
  return json({ value });
}

export const action = async ({ context, request }: LoaderFunctionArgs) => {
  const { A2KANA } = context.cloudflare.env;
  const formData = await request.formData();
  const value = formData.get("my-key")
  console.log({ value })

  await A2KANA.put("my-key", value);

  return redirect("/", { headers: { "Cache-Control": "no-cache" } });
}

export default function Index() {
  const { value } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      <ul>
        <li>
          my-key: {value ? value : "No value found in the KV store."}
        </li>
      </ul>
      <Form method="post">
        <input type="text" name="my-key" />
        <button type="submit">Save to KV</button>
      </Form>
    </div>
  );
}
