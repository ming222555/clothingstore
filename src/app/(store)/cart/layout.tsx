import CartSummaryTable from "@/ui/checkout/cart-summary-table";
///////////// import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { CartEmpty } from "@/ui/checkout/cart-empty";
import { getCart } from "@/dbtesting/dbtesting";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //////////////// const cart = await getCartFromCookiesAction();
  const cart = getCart();
  if (!cart) {
    return <CartEmpty />;
  }
  if (!cart.lines.length) {
    return <CartEmpty />;
  }
  return (
    <div className="Page row g-0 bg-warning">
      <div className="col-xl-7">
        <div
          className="position-sticky top-0"
          style={{ background: "lightgreen" }}
        >
          <h2 className="h2 pb-2">Your cart</h2>
          <CartSummaryTable cart={cart} />
        </div>
      </div>
      <div className="col-xl-5" style={{ background: "lightgreen" }}>
        {children}
      </div>
    </div>
  );
}
