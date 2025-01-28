import Checkout from "@/ui/checkout/checkout";
import { getCheckoutFromCookiesAction } from "@/actions/cart-actions";

export default async function CartPage() {
  const cartCheckout = await getCheckoutFromCookiesAction();
  if (!cartCheckout) {
    console.log(6666666666666);
    return null;
  }
  console.log(cartCheckout);
  return <Checkout checkout={cartCheckout} />;
}
