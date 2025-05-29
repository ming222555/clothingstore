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
      <ShoppingBagIcon onClick={openCartModal} role="button" size="1.8rem" />
      <span
        className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 bg-gray-200 rounded-2xl text-xs min-w-[1rem]"
        role="button"
        onClick={openCartModal}
      >
        {totalItems}
      </span>
    </>
  );
}
