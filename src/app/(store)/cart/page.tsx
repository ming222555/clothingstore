import Checkout from "@/ui/checkout/checkout";
import { getCheckoutFromCookiesAction } from "@/actions/cart-actions";

export default async function CartPage() {
  const cartCheckout = await getCheckoutFromCookiesAction();
  if (!cartCheckout) {
    return null;
  }

  // return <Checkout cartCheckout={cartCheckout} />;
  return <Checkout />;
}
