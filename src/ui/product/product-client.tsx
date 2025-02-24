"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { InView } from "react-intersection-observer";

import AddToCartButton from "@/ui/add-to-cart/add-to-cart-button";

export default function SingleProductPageClient() {
  const notMounted = useRef(true);

  useEffect(() => {
    notMounted.current = false;
  }, []);

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          <AddToCartButton productId="www" />
          <div
            className={`position-fixed start-0 end-0 px-3 bg-white shadow${
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
                  src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
                  width="72"
                  height="72"
                  sizes="(min-width: 420px) 70px, 17vw"
                  loading="eager"
                  priority
                  alt=""
                />
              </div>
              <div className="d-flex flex-column flex-grow-1 ms-3">
                <span className="px-2 fw-bold">Beach Pattern Tee</span>
                <span className="px-2 form-text">$44.00</span>
              </div>
              <div>
                <AddToCartButton productId="www" />
              </div>
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}
