"use client";

import { useEffect, useState } from "react";
import { hc } from "hono/client";
import type { AppType } from "./api/[...route]/route";

const client = hc<AppType>("/");

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [name, setName] = useState<string>();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    client.api.hello
      .$get()
      .then((res) => res.json())
      .then((json) => {
        setName(json.name)
        setImage(json.image)
      });
  }, []);

  return (
    <>
      <nav>
        { session? (
          <>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>Sign In</button>
          </>
        )}
      </nav>
      <p>{typeof name !== "undefined" ? `Hello ${name}!` : "Loading..."}</p>
      <img src={image} alt="image" />
    </>
  );
}
