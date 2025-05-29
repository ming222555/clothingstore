"use client";

import { useContext } from "react";

import { CartModalContext } from "@/providers/cart-modal-provider";

export default function CartModalBackdrop() {
  const { open, closeCartModal } = useContext(CartModalContext);

  return (
    <div
      className={`peer ${
        open ? "open" : ""
      } fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-1 translate-x-full transition-all duration-1000 [&.open]:translate-x-0`}
      onClick={closeCartModal}
    ></div>
  );
}
