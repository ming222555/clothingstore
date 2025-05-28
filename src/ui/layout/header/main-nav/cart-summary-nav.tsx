import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";
import CartSummaryNavShoppingIcon from "./cart-summary-nav-shopping-icon";
import ShoppingBagIconTooltip from "./shopping-bag-icon-tooltip";

const CartFallback = () => (
  <div className="ms-2 opacity-25">
    <ShoppingBagIcon size="1.8rem" />
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

  const total = await Commerce.calculateCartTotalNetWithoutShipping(cart);
  const totalItems = cart.lines.reduce((accum, line) => accum + line.qty, 0);

  return (
    <div className="relative ms-2" data-tooltip-id="shopping-bag-icon-tooltip">
      <CartSummaryNavShoppingIcon />
      <span className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 bg-gray-200 rounded-2xl text-xs min-w-[1rem]">
        {totalItems}
      </span>

      <ShoppingBagIconTooltip
        tooltipId="shopping-bag-icon-tooltip"
        totalItems={totalItems}
        total={total}
        currency={cart.currency}
      />
    </div>
  );
};
