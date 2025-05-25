import type { Metadata } from "next";
import { Toaster } from "sonner";

import { roboto } from "@/lib/utils/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Your Nextjs Store",
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
        style={{
          fontFamily: `${roboto.style.fontFamily}`,
        }}
      >
        <div>
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
