import Image from "next/image";
import { Button } from "@/components/ui/button";

import YnsLink from "@/ui/yns-link";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center bg-[#9BEBF6]">
        <div className="w-3/4 m-auto">
          <br className="md:hidden" />
          <h2 className="h1 font-light">Discover our Curated Collection</h2>
          <p className="text-md text-gray-500 mb-4">
            Explore our carefully selected products for your home and lifestyle.
          </p>

          <YnsLink href="/category/accessories">
            <Button
              type="button"
              role="button"
              size="lg"
              className="text-base font-bold rounded-4xl"
            >
              Shop Now
            </Button>
          </YnsLink>
          <br className="md:hidden" />
          <br className="md:hidden" />
        </div>
      </div>
      <div className="bg-[#9BEBF6]">
        <div className="w-1/2 bg-gray-100 m-auto">
          <Image
            className="w-full h-auto"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/hero.jpeg"
            width="457"
            height="839"
            sizes="(min-width: 1320px) 300px, (min-width: 780px) calc(21.73vw + 18px), calc(50vw - 16px)"
            loading="eager"
            priority
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
