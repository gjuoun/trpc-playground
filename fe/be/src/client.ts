import { createTRPCClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import AbortController from "abort-controller";
import fetch from "node-fetch";
import type { AppRouter } from "./server";

// pages/index.tsx

// polyfill

global.fetch = fetch as any;

async function main() {
  const url = `http://localhost:3001/trpc`;

  const client = createTRPCClient<AppRouter>({
    url,
  });

  const user = await client.query("getUser", "alex");
  console.log(user);

  const newUser = await client.mutation("createUser", {
    name: "Bilbo",
  });

  console.log(newUser);
}

main();
