import { cookies } from "next/headers";
import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";

const CartFallback = () => (
  <div style={{ opacity: 0.3 }}>
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
  const cookieValues = await cookies();
  cookieValues.get("yns_cart");

  await new Promise((resolv) => {
    setTimeout(resolv, 6666);
  });

  return (
    <>
      <p>totalItems 123</p>
      <ShoppingBagIcon />
      {/* 1. Await if cookie ysn_cart exists
      2. If no exist, return <CartFallback />
      3. Otherwise, get cart totalItems and total amount.
      4. Display <ShoppingBagIcon /> and totalItems.
      5. Tooltip hovers to show totalItems and total amount.
        (react bootstrap popover>)
       */}
    </>
  );
};
