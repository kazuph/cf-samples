import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { getAuthenticator } from "../services/auth.server";
import { Layout } from "../components/Layout";

export async function loader({ request, context }: LoaderArgs) {
  const authenticator = getAuthenticator(context);
  const user = await authenticator.isAuthenticated(request);
  return json({
    user,
  });
};

export default function Login() {
  const { user } = useLoaderData<typeof loader>();

  if (user) {
    return (
      <Layout>
        <pre><code>{JSON.stringify(user)}</code></pre>
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      </Layout>
    );
  }
  return (
    <Layout>
      <Form action="/auth/google" method="post">
        <button>Login with Google</button>
      </Form>
    </Layout>
  );
}

