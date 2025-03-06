import type { Metadata } from "next";

import { roboto } from "@/lib/utils/fonts";
import Link from "next/link";
import { Toaster } from "sonner";

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
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
