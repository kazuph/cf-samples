import { reactRenderer } from "@hono/react-renderer";
import { useRequestContext } from "@hono/react-renderer";
import { FC, PropsWithChildren } from "react";

export const HasIslands: FC<PropsWithChildren> = ({ children }) => {
  const IMPORTING_ISLANDS_ID = "__importing_islands" as const;
  const c = useRequestContext();
  return <>{c.get(IMPORTING_ISLANDS_ID) ? children : <></>}</>;
};

export default reactRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <>
            <HasIslands>
              <script type="module" src="/static/client.js" />
            </HasIslands>
            <link href="/static/assets/tailwind.css" rel="stylesheet" />
          </>
        ) : (
          <>
            <script type="module" src="/app/client.ts" />
            <link href="/app/tailwind.css" rel="stylesheet" />
          </>
        )}
        {title ? <title>{title}</title> : ""}
      </head>
      <body className="flex h-screen px-4 py-4 bg-white md:bg-slate-100 md:items-center md:py-0 md:px-0 md:justify-center">
        <div className="container max-w-screen-md mx-auto space-y-4 min-h-64">{children}</div>
      </body>
    </html>
  );
});
