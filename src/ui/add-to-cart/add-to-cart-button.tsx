"use client";

import { useContext, useTransition } from "react";
import { toast } from "sonner";

import { CartModalContext } from "@/providers/cart-modal-provider";
import { addToCartAction } from "@/actions/cart-actions";

export default function AddToCartButton({ productId }: { productId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open, openCartModal } = useContext(CartModalContext);
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="AddToCartButton d-flex align-items-center"
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
      <span className="d-block me-2">Add to cart</span>
      {pending ? <span className="loader"></span> : null}
    </button>
  );
}
