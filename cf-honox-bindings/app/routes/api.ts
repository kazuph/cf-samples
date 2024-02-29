import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Ai } from "@cloudflare/ai";

const app = new Hono();

const schema = z.object({
	prompt: z.string(),
	num_steps: z.string(),
	guidance: z.string(),
});

app.get("/image", zValidator("query", schema), async (c) => {
	const ai = new Ai(c.env.AI);
	const { prompt, num_steps, guidance } = c.req.valid("query");

	const inputs = {
		prompt: `(8k, best quality, masterpiece, highly detailed:1.1,face detail, upper body, realistic photo), ${prompt}`,
		num_steps: parseInt(num_steps) || 20,
		guidance: parseFloat(guidance) || 7.5,
	};

	console.log({ inputs });

	const response = await ai.run<"@cf/bytedance/stable-diffusion-xl-lightning">(
		"@cf/bytedance/stable-diffusion-xl-lightning",
		inputs,
	);

	if (response.error) {
		console.log("error", response.error);
		throw new Error(response.error);
	}

	return new Response(response, {
		headers: {
			"content-type": "image/png",
		},
	});
});

export type AppType = typeof app;
export default app;
