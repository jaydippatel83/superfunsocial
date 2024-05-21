"use client";
import { PrivyProvider } from "@privy-io/react-auth";

export const PrivyProviderComponent = ({ children }) => {
  return <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>{children}</PrivyProvider>;
};
