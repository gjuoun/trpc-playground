import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { Demo } from "./View/Demo";

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:3001/trpc",

      // optional
      headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Demo />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
