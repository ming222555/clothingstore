import Image from "next/image";

import SingleProductPageClient from "./product-client";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="ProductDetails row g-0 row-cols-1 row-cols-md-2">
      <div className="col-12 d-md-none mb-3">
        <h1 className="h2 fw-semibold mb-1">{product.name}</h1>
        <p className="h4 text-body-tertiary">
          {formatMoney(product.unit_price, product.currency)}
        </p>
      </div>
      <div className="col-md-7">
        <Image
          className="w-100 h-auto product-image"
          src={product.img_src}
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
          <h1 className="h2 fw-semibold mb-1">{product.name}</h1>
          <p className="h4 text-body-tertiary">
            {formatMoney(product.unit_price, product.currency)}
          </p>
        </div>
        <div>
          <p className="py-3">{product.description}</p>
          <SingleProductPageClient product={product} />
        </div>
      </div>
    </div>
  );
}
