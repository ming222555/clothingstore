import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getProduct, createCart, addToCart } from "@/lib/db";
import { CART_COOKIE } from "@/lib/cart";

// export async function GET() {
//   //  const res = NextResponse.json({ hello: "world" });
//
//   // Given incoming request /home
//   // const response = NextResponse.next();
//   const response = NextResponse.json({ hello: "world" });
//   // Set a cookie to hide the banner
//  const cartcookie2 = response.cookies.get("show_banner");
//   response.cookies.set("show-banner", "hi-there-banner");
//   // Response will have a `Set-Cookie:show-banner=false;path=/home` header
//   return response;
//   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// }

export async function PUT(req: Request) {
  const body = await req.json();
  const add = body.add;
  if (!add) {
    return NextResponse.json(
      { error: "Product to add must be specified" },
      { status: 400 }
    );
  }
  const product = await getProduct(add);
  if (!product) {
    return NextResponse.json(
      { error: "Product to add is not found" },
      { status: 400 }
    );
  }
  const cookieStore = await cookies();
  const cartcookie = cookieStore.get(CART_COOKIE);
  if (!cartcookie) {
    console.log("createCart(add)createCart(add)createCart(add)");
    await createCart(add);
    cookieStore.set(
      CART_COOKIE,
      JSON.stringify({ id: "pi_456", linesCount: 1 })
    );
    return NextResponse.json({ error: "" }, { status: 201 });
  }

  await addToCart(add);
  cookieStore.set(CART_COOKIE, JSON.stringify({ id: "pi_456", linesCount: 3 }));
  return NextResponse.json({ error: "" }, { status: 200 });

  /////////////// werks
  // const cookieStore = await cookies();
  //
  // cookieStore.set("oooppp", JSON.stringify(988));
  // return NextResponse.json(
  //   { error: "Product to add is not foundiiiiiiii" },
  //   { status: 200 }
  // );
}
