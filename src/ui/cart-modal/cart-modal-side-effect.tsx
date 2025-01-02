"use client";

import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

import { addToCartApi } from "@/lib/client/cart";

export default function CartModalSideEffect({
  add,
}: {
  add: string | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!add) {
      return;
    }

    startTransition(async () => {
      await addToCartApi(add);
      // const data = await addToCart(add);
      // const error = data.error;
      // if( error) {
      //   show toast
      // }

      if (document.location.pathname === "/cart-overlay") {
        // if user is still on the cart page, remove the query params and rerender
        router.replace("/cart-overlay", { scroll: false });
        router.refresh(); // refresh will re-render layout at server for dynamic route
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
