"use client";

import { addToCartApi } from "@/lib/client/cart";

async function ftch() {
  const res = await addToCartApi("one-shoe");
  console.log("res.ok", res.ok);
  const data = await res.json();
  console.log("res.json data", data);
  return data;
}

export default function FetchcookieClient() {
  return <button onClick={() => ftch()}>fetchh</button>;
}
