import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { calculateCartTotalNetWithoutShipping } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";
import ShoppingBagIconTooltip from "./shopping-bag-icon-tooltip";

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

const CartSummaryNavInner = async () => {
  const cart = await getCartFromCookiesAction();
  if (!cart) {
    return <CartFallback />;
  }
  if (!cart.lines.length) {
    return <CartFallback />;
  }

  const total = await calculateCartTotalNetWithoutShipping(cart);
  const totalItems = cart.lines.reduce((accum, line) => accum + line.qty, 0);

  return (
    <YnsLink
      href="/cart-overlay"
      className="d-block position-relative ms-3"
      data-tooltip-id="shopping-bag-icon-tooltip"
    >
      <ShoppingBagIcon />
      <span className="d-flex align-items-center justify-content-center position-absolute top-100 start-100 translate-middle border border-2 bg-warning rounded-pill fs-075 min-w-1rem">
        {totalItems}
      </span>

      <ShoppingBagIconTooltip
        tooltipId="shopping-bag-icon-tooltip"
        totalItems={totalItems}
        total={total}
        currency={cart.currency}
      />
    </YnsLink>
  );
};
