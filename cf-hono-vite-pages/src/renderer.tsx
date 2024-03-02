import 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}

export const renderer = jsxRenderer(
  ({ children, title }) => {
    return (
      <html>
        <head>
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/src/client.ts"></script>
          )}
          <title>{title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>{children}</body>
      </html>
    )
  },
  {
    docType: true
  }
)
