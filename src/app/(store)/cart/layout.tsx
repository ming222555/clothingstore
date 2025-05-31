import CartSummaryTable from "@/ui/checkout/cart-summary-table";
import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";
import { CartEmpty } from "@/ui/checkout/cart-empty";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCartFromCookiesAction();

  if (!cart) {
    return <CartEmpty />;
  }
  if (!cart.lines.length) {
    return <CartEmpty />;
  }

  const cartTotalNetWithoutShipping =
    await Commerce.calculateCartTotalNetWithoutShipping(cart);

  const sr = await Commerce.getCartShippingRate(cart);
  const rate = sr ? sr.rate : 0;

  const total = cartTotalNetWithoutShipping + rate;

  return (
    <div className="Page grid grid-cols-12">
      <div className="col-span-12 xl:col-span-7">
        <div className="sticky top-0">
          <h2 className="h3 pb-2">Your cart</h2>
          <CartSummaryTable cart={cart} shippingRate={sr} total={total} />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-10 sm:col-start-2 xl:col-span-5">
        <div>
          <h2 className="h3 mt-4 mb-0 ps-3">Checkout</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
