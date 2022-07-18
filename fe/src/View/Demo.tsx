import React, { useEffect } from "react";
import { trpc } from "../trpc";

export const Demo = () => {
  const { data } = trpc.useQuery(["getUser", "me"]);
  const {
    mutate: createUser,
    data: newUser,
    error,
  } = trpc.useMutation(["createUser"]);

  useEffect(() => {
    createUser({ name: "testf" });
  }, []);

  console.log("error", error?.message);
  console.log("newUser", newUser);

  return <div>{data?.name}</div>;
};
