import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link href='/app/globals.css' rel='stylesheet' />
        {import.meta.env.PROD ? (
          <script type='module' src='/static/client.js'></script>
        ) : (
          <script type='module' src='/app/client.ts'></script>
        )}
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  )
})
