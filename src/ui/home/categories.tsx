import Image from "next/image";

import YnsLink from "@/ui/yns-link";

export default function FeaturedCategories() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <YnsLink href="/category/apparel" className="rounded-xl block">
          <Image
            className="rounded-xl hover:opacity-75"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/apparel.jpg"
            width="906"
            height="503"
            sizes="(min-width: 1320px) 598px, (min-width: 1000px) calc(38.67vw + 95px), calc(100vw - 34px)"
            loading="lazy"
            alt=""
          />
          <div className="ps-2">
            <h3 className="h5 font-bold pt-4 pb-2">
              <span>Apparel</span>
              <span className="h6 block pt-2 text-gray-400">Shop now</span>
            </h3>
          </div>
        </YnsLink>
      </div>
      <div>
        <YnsLink href="/category/shoes" className="rounded-xl block">
          <Image
            className="rounded-xl hover:opacity-75"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/shoes.jpg"
            width="944"
            height="525"
            sizes="(min-width: 1320px) 598px, (min-width: 1000px) calc(38.67vw + 95px), calc(100vw - 34px)"
            loading="lazy"
            alt=""
          />
          <div className="ps-2">
            <h3 className="h5 font-bold pt-4 pb-2">
              <span>Shoes</span>
              <span className="h6 block pt-2 text-gray-400">Shop now</span>
            </h3>
          </div>
        </YnsLink>
      </div>
    </div>
  );
}
