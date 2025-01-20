"use client";

import { useContext } from "react";

import { CartModalContext } from "@/providers/cart-modal-provider";

export default function CartModalBackdrop() {
  const { open, closeCartModal } = useContext(CartModalContext);

  return (
    <div
      className={`CartModalBackdrop${
        open ? " open" : ""
      } position-fixed top-0 bottom-0 start-0 end-0 bg-dark opacity-50 z-1`}
      onClick={closeCartModal}
    ></div>
  );
}
