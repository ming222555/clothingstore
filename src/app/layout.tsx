import type { Metadata } from "next";

import { roboto } from "@/lib/utils/fonts";
import Link from "next/link";
import { Toaster } from "sonner";

import createCookieAction from "@/actions/createCookieAction";
import FetchcookieClient from "./fetchcookie-client";
import "../globals.scss";

export const metadata: Metadata = {
  title: "Your Store",
  description: "Created by nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--bs-body-font-family": `${roboto.style.fontFamily}`,
          } as React.CSSProperties
        }
      >
        <div>
          <form action={createCookieAction}>
            <input type="text" defaultValue="popp" />
            <button type="submit">Cre cart cookie</button>
          </form>
          <FetchcookieClient />
          <div className="testing123">
            <Link href="/cart-overlay?add=arctic-circle-neck-warmer">
              arctic-circle-neck-warmer add cart
            </Link>
            <Link href="/cart-overlay?add=beach-pattern-tee">
              beach-pattern-tee add cart
            </Link>{" "}
            <Link href="/cart-overlay?add=dummy-prod">dummy</Link>{" "}
            <Link href="/product/beach-pattern-tee">
              Product Beach Pattern Tee
            </Link>{" "}
            <Link href="/product/champagne-tee">Champagne Tee</Link>{" "}
            <Link href="/product/flamingo-polo-tee">Flamingo Polo Tee</Link>{" "}
            <Link href="/product/brown-nodisturbance-casual">
              Nodisturbance
            </Link>
          </div>
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
