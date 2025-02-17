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
    <div className="Page row g-0 bg-warning">
      <div className="col-xl-7">
        <div
          className="position-sticky top-0"
          style={{ background: "lightgreen" }}
        >
          <h2 className="h2 pb-2">Your cart</h2>
          <CartSummaryTable cart={cart} shippingRate={sr} total={total} />
        </div>
      </div>
      <div
        className="col-sm-10 offset-sm-1 col-xl-5 offset-xl-0"
        style={{ background: "lightblue" }}
      >
        <div style={{ background: "white" }}>
          <h2 className="h2 mb-0">Checkout</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
