import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { store } from "@/store";
import EPProvider from "./context/store-provider";

import QueryProvider from "./context/query-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BugloApp",
  description: "Manage your Buglo Projects",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <EPProvider store={store}>
          <QueryProvider>{children}</QueryProvider>
        </EPProvider>
      </body>
    </html>
  );
}
