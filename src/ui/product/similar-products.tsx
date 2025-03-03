import Image from "next/image";

import YnsLink from "@/ui/yns-link";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function SimilarProducts({
  productId,
  similarProducts,
}: {
  productId: string;
  similarProducts: Product[];
}) {
  return (
    <div
      className={`SimilarProducts mb-5${
        similarProducts.length > 1 ? " d-block" : " d-none" // exclude productId from listing to display
      }`}
    >
      <h2 className="h4 fw-semibold mt-5 mb-4">You May Also Like</h2>
      <div className="row g-0 row-gap-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 bg-body-tertiary">
        {similarProducts.length &&
          similarProducts.map((p) =>
            p.id !== productId ? (
              <div className="col" key={p.id}>
                <div className="SimilarProducts__details shadow-sm">
                  <YnsLink href={`/product/${p.id}`} className="d-block">
                    <Image
                      className="SimilarProducts__image w-100 h-auto product-image"
                      src={p.img_src}
                      width="736"
                      height="736"
                      sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                      loading="lazy"
                      alt=""
                    />
                  </YnsLink>
                  <div className="ps-2">
                    <h3 className="h5 fw-semibold">
                      <YnsLink
                        href={`/product/${p.id}`}
                        className="d-inline-block pt-3 text-dark"
                      >
                        {p.name}
                      </YnsLink>
                    </h3>
                    <div className="pb-3">
                      <span className="h6">
                        {formatMoney(p.unit_price, p.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}
