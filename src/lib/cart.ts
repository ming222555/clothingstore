import { cookies } from "next/headers";

import { safeJsonParse } from "@/lib/utils/utils";

export const CART_COOKIE = "yns_cart";

type CartCookieJson = { id: string; linesCount: number };

export async function setCartCookieJson(
  cartCookieJson: CartCookieJson
): Promise<boolean> {
  try {
    (await cookies()).set(CART_COOKIE, JSON.stringify(cartCookieJson));
    return true;
  } catch (error) {
    console.error("Failed to set cart cookie", error);
    return false;
  }
}

export async function getCartCookieJson() {
  const cookiesValue = await cookies();
  const cartCookieValue = cookiesValue.get(CART_COOKIE)?.value;

  if (cartCookieValue === undefined) {
    return null;
  }

  const cartCookieJson = safeJsonParse(cartCookieValue);

  if (!cartCookieJson) {
    return null;
  }

  // Need check as JSON.parse(123) is valid and returns number 123
  if (typeof cartCookieJson !== "object") {
    return null;
  }

  // Check for keys 'id' and 'linesCount' exist.
  // linesCount provides a countercheck to the number of product lines shown at cart page
  if (!("id" in cartCookieJson) || !("linesCount" in cartCookieJson)) {
    return null;
  }

  if (
    typeof cartCookieJson.id !== "string" ||
    typeof cartCookieJson.linesCount !== "number"
  ) {
    return null;
  }

  return cartCookieJson as CartCookieJson;
}
