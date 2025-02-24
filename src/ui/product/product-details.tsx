import Image from "next/image";

import SingleProductPageClient from "./product-client";

export default function ProductDetails() {
  return (
    <div className="ProductDetails row g-0 row-cols-1 row-cols-md-2">
      <div className="col-12 d-md-none mb-3">
        <h1 className="h2 fw-semibold mb-1">Beach Pattern Tee</h1>
        <p className="h4 text-body-tertiary">$800.00</p>
      </div>
      <div className="col-md-7">
        <Image
          className="w-100 h-auto product-image"
          src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
          width="736"
          height="736"
          sizes="(min-width: 1320px) 698px, (min-width: 780px) calc(50.77vw + 38px), calc(100vw - 34px)"
          loading="eager"
          priority
          alt=""
        />
      </div>
      <div className="ProductDetails__description col-md-5 border border-1">
        <div className="d-none d-md-block">
          <h1 className="h2 fw-semibold mb-1">Beach Pattern Tee</h1>
          <p className="h4 text-body-tertiary">$800.00</p>
        </div>
        <div>
          <p className="py-3">
            Lightweight and cooling, designed for beach getaways.
          </p>
          <SingleProductPageClient />
        </div>
      </div>
    </div>
  );
}
