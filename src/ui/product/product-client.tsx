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
            className={`position-fixed start-0 end-0 px-3 bg-white opacity-95 shadow${
              notMounted.current
                ? " bottom-100"
                : inView
                ? " bottom-100"
                : " bottom-0"
            }`}
          >
            <div
              className="py-2 d-flex align-items-center m-auto"
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
                  className="w-100 h-auto product-image"
                  src={product.img_src}
                  width="72"
                  height="72"
                  sizes="(min-width: 420px) 70px, 17vw"
                  loading="eager"
                  priority
                  alt=""
                />
              </div>
              <div className="d-flex flex-column ms-3">
                <span className="px-2 fw-bold">{product.name}</span>
                <span className="px-2 form-text">
                  {formatMoney(product.unit_price, product.currency)}
                </span>
              </div>
              <div className="ms-auto flex-shrink-0">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}
