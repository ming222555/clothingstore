"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";

import { CartModalContext } from "@/providers/cart-modal-provider";
import YnsLink from "@/ui/yns-link";

export default function GoToPayment({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { closeCartModal } = useContext(CartModalContext);
  const router = useRouter();

  return (
    <YnsLink
      href="/cart"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        closeCartModal();
        router.push("/cart");
      }}
    >
      {children}
    </YnsLink>
  );
}
