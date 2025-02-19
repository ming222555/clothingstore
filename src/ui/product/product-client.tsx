"use client";

import { useEffect, useRef } from "react";
import { InView } from "react-intersection-observer";

export default function SingleProductPageClient() {
  const notMounted = useRef(true);

  useEffect(() => {
    notMounted.current = false;
  }, []);

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref} className="border border-3">
          <button type="button">$Add to cart</button>
          <div
            className={`position-fixed start-0 end-0 bg-warning${
              notMounted.current
                ? " bottom-100"
                : inView
                ? " bottom-100"
                : " bottom-0"
            }`}
          >
            ZebraBlend T-Shirt $44.00 [Add to cart]
          </div>
        </div>
      )}
    </InView>
  );
}
