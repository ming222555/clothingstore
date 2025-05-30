import Image from "next/image";

import YnsLink from "@/ui/yns-link";
import type { Product } from "@/lib/commerce-kit";
import { formatMoney } from "@/lib/utils/utils";

export default function CategoryProducts({
  category,
  products,
}: {
  category: string;
  products: Product[];
}) {
  return (
    <div className="mb-20 mt-[-1rem]">
      <h1 className="h2 font-bold mt-5 mb-4">
        {category}
        <p className="h5 pb-1 text-cyan-500">Category</p>
      </h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ${
          products.length ? " d-flex" : " d-none"
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
                  <h3 className="h5 font-bold">
                    <span className="inline-block pt-3 text-black">
                      {p.name}
                    </span>
                  </h3>
                  <div className="pb-3">
                    <span className="h6 text-gray-500">
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
