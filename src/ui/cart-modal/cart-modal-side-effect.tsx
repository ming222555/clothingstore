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
      /**
       * We will abandon below addToCartApi() call method.
       * This is cos if user clicks on modal backdrop to close modal,
       * thereby unmounting CartModalSideEffect, then subsequent router.refresh()
       * below will not have chance to run, which would mean layout (and thus CartSummary)
       * will not rerender.
       *
       * A solution would be to use "await addToCartAction(add)" server action method, as
       * in "/home/ming/coding/yournextstore => CartModalAddSideEffect".
       * This method rerenders layout (and thus CartSummary) even if user has closed modal,
       * since a cookie.set() call in server action will automatically refresh current
       * route (indeed, a cookie.set() call in server action will clear client router cache),
       * regardless whether user is still on cart modal page or has left it.
       * But if still on cart modal page, the page will rerender with searchparam add still around.
       * This would optimistically however repeat add cart product once again, which is incorrect display,
       * albeit that a subsequent manual "router.replace("/cart-overlay"); router.refresh()" below
       * will refresh cart modal page without searchparam add this time around and display correct cart content.
       *
       * Another solution is shown at "/home/ming/coding/yournextstorev2-no-use-@modal" by using
       * a CartModalProvider method.
       * It is this method then that we shall purse for
       * /home/ming/coding/yournextjsstore
       * In view of this, a new branch (cartModalProvider-method) will be created in this git repo
       * for such CartModalProvider method prior to porting over to
       * /home/ming/coding/yournextjsstore
       *
       */
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
