import Checkout from "@/ui/checkout/checkout";
import { getCheckoutFromCookiesAction } from "@/actions/cart-actions";

export default async function CartPage() {
  const cartCheckout = await getCheckoutFromCookiesAction();

  console.log(cartCheckout);
  return <Checkout checkout={cartCheckout} />;
}
