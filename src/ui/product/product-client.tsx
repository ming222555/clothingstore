"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { InView } from "react-intersection-observer";

import AddToCartButton from "@/ui/add-to-cart/add-to-cart-button";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function SingleProductPageClient({
  product,
}: {
  product: Product;
}) {
  const notMounted = useRef(true);

  useEffect(() => {
    notMounted.current = false;
  }, []);

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          <AddToCartButton productId={product.id} />
          <div
            className={`fixed left-0 right-0 px-3 bg-white opacity-95 shadow-md z-1 ${
              notMounted.current
                ? "bottom-full"
                : inView
                ? "bottom-full"
                : "bottom-0"
            }`}
          >
            <div
              className="py-2 flex items-center m-auto inset-shadow-xs inset-shadow-gray-300"
              style={{
                maxWidth: "var(--bs-breakpoint-xl)",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                }}
              >
                <Image
                  className="rounded-xl"
                  src={product.img_src}
                  width="72"
                  height="72"
                  sizes="(min-width: 420px) 70px, 17vw"
                  loading="eager"
                  priority
                  alt=""
                />
              </div>
              <div className="flex flex-col ms-3">
                <span className="px-2 text-lg font-bold">{product.name}</span>
                <span className="px-2 text-sm">
                  {formatMoney(product.unit_price, product.currency)}
                </span>
              </div>
              <div className="ms-auto shrink-0">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}
