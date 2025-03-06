import Image from "next/image";

import YnsLink from "@/ui/yns-link";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="FeaturedProducts mb-5 mt-5">
      <div
        className={`row g-0 row-gap-3 row-cols-1 row-cols-sm-2 row-cols-xl-3 bg-body-tertiary${
          products.length ? " d-flex" : " d-none"
        }`}
      >
        {products.length &&
          products.map((p, idx) => (
            <div className="col" key={p.id}>
              <YnsLink
                href={`/product/${p.id}`}
                className="FeaturedProducts__details shadow-sm d-block"
              >
                <Image
                  className="FeaturedProducts__image w-100 h-auto product-image"
                  src={p.img_src}
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 380px, (min-width: 580px) calc(50vw - 18px), calc(100vw - 34px)"
                  loading={idx < 3 ? "eager" : "lazy"}
                  alt=""
                />
                <div className="ps-2">
                  <h3 className="h5 fw-semibold">
                    <span className="d-inline-block pt-3 text-dark">
                      {p.name}
                    </span>
                  </h3>
                  <div className="pb-3">
                    <span className="h6 text-body-tertiary">
                      {formatMoney(p.unit_price, p.currency)}
                    </span>
                  </div>
                </div>
              </YnsLink>
            </div>
          ))}
      </div>
    </div>
  );
}
