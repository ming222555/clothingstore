import Image from "next/image";

import SingleProductPageClient from "./product-client";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="md:hidden mb-3">
        <h1 className="h2 font-bold mb-1">{product.name}</h1>
        <p className="h4 text-gray-500">
          {formatMoney(product.unit_price, product.currency)}
        </p>
      </div>
      <div className="md:col-span-7">
        <Image
          className="rounded-xl"
          src={product.img_src}
          width="736"
          height="736"
          sizes="(min-width: 1320px) 698px, (min-width: 780px) calc(50.77vw + 38px), calc(100vw - 34px)"
          loading="eager"
          priority
          alt=""
        />
      </div>
      <div className="md:col-span-5 sm:pl-4">
        <div className="hidden md:block">
          <h1 className="h2 font-bold mb-1">{product.name}</h1>
          <p className="h4 text-gray-500">
            {formatMoney(product.unit_price, product.currency)}
          </p>
        </div>
        <div>
          <p className="pt-3 pb-6">{product.description}</p>
          <SingleProductPageClient product={product} />
        </div>
      </div>
    </div>
  );
}
