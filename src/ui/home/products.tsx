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
    <div className="mb-12 mt-5">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ${
          products.length ? "flex" : "hidden"
        }`}
      >
        {products.length &&
          products.map((p, idx) => (
            <div key={p.id}>
              <YnsLink
                href={`/product/${p.id}`}
                className="group rounded-xl shadow-sm block"
              >
                <Image
                  className="group-hover:opacity-75 rounded-xl"
                  src={p.img_src}
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 380px, (min-width: 580px) calc(50vw - 18px), calc(100vw - 34px)"
                  loading={idx < 3 ? "eager" : "lazy"}
                  alt=""
                />
                <div className="ps-2">
                  <h3 className="h5 font-bold pt-4 pb-2">
                    <span>{p.name}</span>
                    <span className="h6 block pt-2 text-gray-400">
                      {formatMoney(p.unit_price, p.currency)}
                    </span>
                  </h3>
                </div>
              </YnsLink>
            </div>
          ))}
      </div>
    </div>
  );
}
