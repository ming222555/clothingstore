"use client";

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
                  width: 60,
                  height: 60,
                  background: "green",
                }}
              >
                <div
                  className="bg-light"
                  style={{
                    width: 60,
                    height: 60,
                  }}
                >
                  Image Pic
                </div>
              </div>
              <div className="d-flex flex-column flex-grow-1">
                <span className="px-2 fw-bold">ZebraBlend T-Shirt</span>
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
