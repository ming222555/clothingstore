"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useContext } from "react";

import { CartModalContext } from "@/providers/cart-modal-provider";

export default function CartSummaryNavShoppingIcon() {
  const { openCartModal } = useContext(CartModalContext);

  return (
    <ShoppingBagIcon onClick={openCartModal} className="hover-cursor-pointer" />
  );
}
