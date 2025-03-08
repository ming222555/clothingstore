"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

import { cartUpdateAction } from "@/actions/cart-actions";
import type { OptimisticCartActionType, Delta } from "./cart-summary-table";

export default function CartItemQuantity({
  qty,
  productId,
  onChange,
  actionProductId,
}: {
  qty: number;
  productId: string;
  onChange: (action: OptimisticCartActionType) => void;
  actionProductId: string;
}) {
  const pendingPromise = useRef<PromiseWithResolvers<void> | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { pending } = useFormStatus();
  const isPending =
    productId === actionProductId && (pending || timer.current !== null);

  const router = useRouter();

  function formAction(delta: Delta) {
    onChange({ productId, delta });

    const remoteCartUpdate = async () => {
      const rc = await cartUpdateAction(
        qty + (delta === "INCREASE" ? 1 : -1),
        productId
      );

      // Update failed
      if (rc.error) {
        console.log("remoteCartUpdate error", rc.error);
        toast(rc.error);

        // this will revert optimisticCart to the initial value passed to useOptimistic()
        if (pendingPromise.current) {
          // needs conditional check, o/w will hit runtime error "Cannot read properties of null (reading 'resolve')"
          // if user clicks button at such speed that cartUpdateAction() returns after some quick clicks and a brief pause,
          // and returns shortly again after continuation of some quick clicks and a pause
          pendingPromise.current.resolve();
        }

        // reset to null as resolved promise cannot
        // be reused for resolve.
        // Will be set to new pending promise when user
        // click increase.decrease button again.
        pendingPromise.current = null;

        timer.current = null;
        return;
      }

      // Update successful

      // refresh will rerender route, including layout ( and hence also CartSummaryNav)
      // if dynamic route which it is the case here.
      //
      // due to rerender, the initial value of useOptimistic() at CartSummaryTable
      // will be updated and optimisticCart be updated to the new initial value
      router.refresh();

      // this will revert optimisticCart to initial value
      if (pendingPromise.current) {
        // needs conditional check, o/w will hit runtime error "Cannot read properties of null (reading 'resolve')"
        // if user clicks button at such speed that cartUpdateAction() returns after some quick clicks and a brief pause,
        // and returns shortly again after continuation of some quick clicks and a pause
        pendingPromise.current.resolve();
      }

      // reset to null as resolved promise cannot
      // be reused for resolve.
      // Will be set to new pending promise when user
      // click increase.decrease button again.
      pendingPromise.current = null;

      timer.current = null;
    };

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        remoteCartUpdate();
      }, 400);
    } else {
      timer.current = setTimeout(() => {
        remoteCartUpdate();
      }, 400);
      pendingPromise.current = Promise.withResolvers();
    }

    // returning a pending promise will,
    // at useOptimistic() of CartSummaryTable,
    // keep optimisticCart at its present value and
    // prevent it from reverting to the initial value passed
    // to useOptimistic()
    return pendingPromise.current!.promise;
  }

  return (
    <span
      className={`CartItemQuantity d-flex flex-column flex-sm-row align-items-center justify-content-between p-1${
        isPending ? " bg-white cursor-wait" : ""
      }`}
    >
      <button
        type="submit"
        disabled={qty <= 0}
        className={`btn btn-light btn-sm${isPending ? " cursor-wait" : ""}`}
        formAction={() => formAction("DECREASE")}
      >
        <span>-</span>
      </button>
      <span>{qty}</span>
      <button
        type="submit"
        className={`btn btn-light btn-sm${isPending ? " cursor-wait" : ""}`}
        formAction={() => formAction("INCREASE")}
      >
        <span>+</span>
      </button>
    </span>
  );
}
