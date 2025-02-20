"use client";

import { useContext, useTransition } from "react";
import { toast } from "sonner";

import { CartModalContext } from "@/providers/cart-modal-provider";
import { addToCartAction } from "@/actions/cart-actions";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { openCartModal } = useContext(CartModalContext);
  const [pending, startTransition] = useTransition();

  return (
    <button
      className={`btn btn-dark rounded-pill w-100${
        pending ? " cursor-wait" : ""
      }`}
      disabled={pending}
      onClick={() => {
        if (pending) {
          return;
        }

        openCartModal();

        startTransition(async () => {
          const res = await addToCartAction(productId);
          if (res.error) {
            toast(res.error);
          } else {
            toast("Successfully added to cart");
          }
        });
      }}
    >
      <p className="h5 my-1">Add to cart</p>
    </button>
  );
}
