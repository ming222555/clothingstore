import type { Metadata } from "next";
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
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
