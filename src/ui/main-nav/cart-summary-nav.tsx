import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { calculateCartTotalNetWithoutShipping } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";

const CartFallback = () => (
  <div className="ms-3 opacity-25">
    <ShoppingBagIcon />
  </div>
);

export default function CartSummaryNav() {
  return (
    <Suspense fallback={<CartFallback />}>
      <CartSummaryNavInner />
    </Suspense>
  );
}

const CartSummaryNavInnerContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;

const CartSummaryNavInner = async () => {
  const cart = await getCartFromCookiesAction();
  if (!cart) {
    return <CartFallback />;
  }
  if (!cart.lines.length) {
    return <CartFallback />;
  }

  // const total = await calculateCartTotalNetWithoutShipping(cart);
  const totalItems = cart.lines.reduce((accum, line) => accum + line.qty, 0);

  return (
    <CartSummaryNavInnerContent>
      <YnsLink href="/cart-overlay" className="d-block position-relative ms-3">
        <ShoppingBagIcon />
        <span className="d-flex align-items-center justify-content-center position-absolute top-100 start-100 translate-middle border border-2 bg-warning rounded-pill fs-7">
          {totalItems}
        </span>
      </YnsLink>
    </CartSummaryNavInnerContent>
  );
};
