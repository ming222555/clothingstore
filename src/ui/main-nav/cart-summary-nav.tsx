import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";
import ShoppingBagIconTooltip from "./shopping-bag-icon-tooltip";

const CartFallback = () => (
  <div className="ms-3 opacity-25">
    <ShoppingBagIcon />
  </div>
);

export default function CartSummaryNav() {
  console.log("Cartttttttttttt");
  return (
    <Suspense fallback={<CartFallback />}>
      <CartSummaryNavInner />
    </Suspense>
  );
}

const CartSummaryNavInner = async () => {
  console.log("yyyyyyyyyy iiiiiiiiii CartSummaryNavInner");
  const cart = await getCartFromCookiesAction();
  if (!cart) {
    console.log("yyyyyyyyyy iiiiiiiiii CartSummaryNavInner NO cart found");
    return <CartFallback />;
  }
  if (!cart.lines.length) {
    return <CartFallback />;
  }

  const total = await Commerce.calculateCartTotalNetWithoutShipping(cart);
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
