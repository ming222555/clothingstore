"use client";

import { useContext, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { CartModalContext } from "@/providers/cart-modal-provider";
import { addToCartAction } from "@/actions/cart-actions";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { openCartModal } = useContext(CartModalContext);
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      role="button"
      size="lg"
      className={`text-lg font-bold rounded-4xl w-full ${
        pending ? "cursor-wait" : ""
      }`}
      onClick={() => {
        if (pending) {
          return;
        }

        startTransition(async () => {
          const res = await addToCartAction(productId);
          if (res.error) {
            toast(res.error);
          } else {
            openCartModal();
            toast("Successfully added to cart");
          }
        });
      }}
    >
      Add to cart
    </Button>
  );
}
