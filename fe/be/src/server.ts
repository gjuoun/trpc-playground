import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import * as trpc from "@trpc/server";
import { z } from "zod";
import cors from "cors";

const PORT = 3001;

const app = express();

app.use(cors());

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== "secret") {
      return null;
    }
    return {
      name: "alex",
    };
  };

  return {
    req,
    res,
    user: getUser(),
  };
};

const inputSchema = z.object({
  name: z.string().min(5),
  age: z.number(),
});

type NewUser = z.infer<typeof inputSchema>;

const appRouter = trpc
  .router()
  .query("getUser", {
    input: (val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    },
    async resolve(req) {
      req.input; // string
      return { id: req.input, name: "Bilbo" };
    },
  })
  .mutation("createUser", {
    // validate input with Zod
    input: inputSchema,
    async resolve(req) {
      // use your ORM of choice
      return { id: "1", name: req.input.name };
    },
  });

function main() {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get("/", (req, res) => res.send("Express + Prisma + tRPC + tRPC Shield"));

  app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
  });
}

main();

export type AppRouter = typeof appRouter;
