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
            className={`position-fixed start-0 end-0 px-3 bg-warning${
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
                className="d-flex py-2"
                style={{
                  width: 60,
                  height: 60,
                  background: "green",
                  color: "white",
                }}
              >
                <div className="bg-info flex-grow-1">Pic</div>
              </div>
              <div className="d-flex flex-column bg-info flex-grow-1">
                <span className="bg-danger">ZebraBlend T-Shirt</span>
                <span>$44.00</span>
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
