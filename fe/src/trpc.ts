import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../be/src/server";

export const trpc = createReactQueryHooks<AppRouter>();
