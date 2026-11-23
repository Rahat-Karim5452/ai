import { headers } from "next/headers";
import { auth } from "./auth";

// Use inside server components (pages without "use client")
export const getTokenFromServer = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  return token;
};
