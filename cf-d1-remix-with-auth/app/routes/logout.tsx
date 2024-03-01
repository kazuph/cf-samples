import type { ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export const loader = async () => redirect("/");

export async function action({ request, context }: ActionArgs) {
  const authenticator = getAuthenticator(context);
  await authenticator.logout(request, { redirectTo: "/login" });
};
