import {} from "hono";

type Head = {
	title?: string;
};

declare module "hono" {
	interface Env {
		Variables: {};
		Bindings: {};
	}
	type ContextRenderer = (
		content: string | Promise<string>,
		head?: Head,
	) => Response | Promise<Response>;
}
// import {} from "hono";

// import "@hono/react-renderer";

// declare module "@hono/react-renderer" {
// 	interface Props {
// 		title?: string;
// 	}
// }
