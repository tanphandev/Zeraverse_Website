"use client";
import { SessionProvider } from "next-auth/react";
function SSOProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SSOProvider;
