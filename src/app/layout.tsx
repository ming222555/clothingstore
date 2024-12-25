import type { Metadata } from "next";

import createCookieAction from "@/actions/createCookieAction";
import { roboto } from "@/lib/utils/fonts";
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
          {children}
        </div>
      </body>
    </html>
  );
}
