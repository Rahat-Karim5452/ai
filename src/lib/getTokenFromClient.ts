import { authClient } from "./auth-client";

// Use inside client components ("use client")
export const getTokenFromClient = async () => {
  const { data } = await authClient.token();
  return data?.token;
};
