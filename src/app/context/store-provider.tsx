"use client";

import { StoreProvider } from "easy-peasy";

export default function EPProvider({
  children,
  store,
}: {
  children: React.ReactNode;
  store: any;
}): React.ReactNode {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
