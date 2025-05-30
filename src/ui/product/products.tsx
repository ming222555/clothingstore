import Image from "next/image";

import YnsLink from "@/ui/yns-link";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function SimilarProducts({
  productId,
  products,
}: {
  productId: string;
  products: Product[];
}) {
  return (
    <div
      className={`mb-20 ${
        products.length > 1 ? "block" : "hidden" // exclude productId from listing to display
      }`}
    >
      <h2 className="h4 font-bold mt-12 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.length &&
          products.map((p) =>
            p.id !== productId ? (
              <div key={p.id}>
                <div className="group shadow-sm">
                  <YnsLink href={`/product/${p.id}`} className="block">
                    <Image
                      className="group-hover:opacity-75 rounded-xl"
                      src={p.img_src}
                      width="736"
                      height="736"
                      sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                      loading="lazy"
                      alt=""
                    />
                  </YnsLink>
                  <div className="ps-2">
                    <h3 className="h5 font-bold">
                      <YnsLink
                        href={`/product/${p.id}`}
                        className="inline-block pt-3 text-black"
                      >
                        {p.name}
                      </YnsLink>
                    </h3>
                    <div className="pb-3">
                      <span className="h6 text-gray-500">
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
