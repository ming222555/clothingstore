import Image from "next/image";

import YnsLink from "@/ui/yns-link";

export default function FeaturedCategories() {
  return (
    <div className="FeaturedCategories row g-0 row-gap-3 row-cols-1 row-cols-lg-2">
      <div className="col">
        <YnsLink
          href="/category/apparel"
          className="FeaturedCategories__details d-block"
        >
          <Image
            className="FeaturedCategories__image w-100 h-auto product-image"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/apparel.jpg"
            width="906"
            height="503"
            sizes="(min-width: 1320px) 598px, (min-width: 1000px) calc(38.67vw + 95px), calc(100vw - 34px)"
            loading="lazy"
            alt=""
          />
          <div className="ps-2">
            <h3 className="h5 fw-semibold">
              <span className="d-inline-block pt-3 text-dark">Apparel</span>
            </h3>
            <div className="pb-3">
              <span className="h6">Shop now</span>
            </div>
          </div>
        </YnsLink>
      </div>
      <div className="col">
        <YnsLink
          href="/category/shoes"
          className="FeaturedCategories__details d-block"
        >
          <Image
            className="FeaturedCategories__image w-100 h-auto product-image"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes.jpg"
            width="944"
            height="525"
            sizes="(min-width: 1320px) 598px, (min-width: 1000px) calc(38.67vw + 95px), calc(100vw - 34px)"
            loading="lazy"
            alt=""
          />
          <div className="ps-2">
            <h3 className="h5 fw-semibold">
              <span className="d-inline-block pt-3 text-dark">Shoes</span>
            </h3>
            <div className="pb-3">
              <span className="h6">Shop now</span>
            </div>
          </div>
        </YnsLink>
      </div>
    </div>
  );
}
