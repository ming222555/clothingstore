"use server";

import { cookies } from "next/headers";

export default async function createCookieAction() {
  const cookiesValue = await cookies();
  cookiesValue.set(
    "yns_cart",
    JSON.stringify({ id: "ynscartid", linesCount: 666 })
  );
}
