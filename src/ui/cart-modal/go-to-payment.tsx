"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

import { CartModalContext } from "@/providers/cart-modal-provider";
import YnsLink from "@/ui/yns-link";

export default function GoToPayment({
  children,
  isButton = false,
}: {
  children: React.ReactNode;
  isButton?: boolean;
}) {
  const { closeCartModal } = useContext(CartModalContext);
  const router = useRouter();

  return isButton ? (
    <YnsLink
      href="/cart"
      className="grow"
      onClick={(e) => {
        e.preventDefault();
        closeCartModal();
        router.push("/cart");
      }}
    >
      <Button
        type="button"
        role="button"
        size="lg"
        className="text-base font-bold rounded-4xl w-full"
      >
        {children}
      </Button>
    </YnsLink>
  ) : (
    <YnsLink
      href="/cart"
      className="underline text-sm text-gray-500"
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
