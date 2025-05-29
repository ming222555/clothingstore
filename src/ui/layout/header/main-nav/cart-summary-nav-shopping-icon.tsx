"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useContext } from "react";

import { CartModalContext } from "@/providers/cart-modal-provider";

export default function CartSummaryNavShoppingIcon({
  totalItems,
}: {
  totalItems: number;
}) {
  const { openCartModal } = useContext(CartModalContext);

  return (
    <>
      <ShoppingBagIcon onClick={openCartModal} role="button" />
      <span
        className="flex items-center justify-center absolute top-15/16 left-15/16 -translate-1/2 bg-white border rounded-4xl text-xs min-w-[1.6rem] p-1"
        role="button"
        onClick={openCartModal}
      >
        {totalItems}
      </span>
    </>
  );
}
