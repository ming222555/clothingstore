import Checkout from "@/ui/checkout/checkout";
import {
  getCheckoutFromCookiesAction,
  validateCheckoutAction,
  getShippingRatesAction,
} from "@/actions/cart-actions";

export default async function CartPage() {
  const cartCheckout = await getCheckoutFromCookiesAction();

  let preValidationOk = null;

  if (cartCheckout) {
    const rc = await validateCheckoutAction(cartCheckout);

    if (rc < 0) {
      preValidationOk = false;
    } else {
      preValidationOk = true;
    }
  }

  const shippingRates = await getShippingRatesAction();

  console.log(cartCheckout);
  return (
    <Checkout
      checkout={cartCheckout}
      preValidationOk={preValidationOk}
      shippingRates={shippingRates}
    />
  );
}
