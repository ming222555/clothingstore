import Image from "next/image";

import YnsLink from "@/ui/yns-link";

export default function Hero() {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-0">
      <div
        className="col d-flex align-items-center"
        style={{ background: "#9BEBF6" }}
      >
        <div className="w-75 m-auto">
          <br className="d-md-none" />
          <h2 className="h1 fw-bold">Discover our Curated Collection</h2>
          <p className="form-text fs-6">
            Explore our carefully selected products for your home and lifestyle.
          </p>
          <YnsLink
            className="btn btn-dark rounded-pill px-3"
            href="/category/accessories"
          >
            Shop Now
          </YnsLink>
          <br className="d-md-none" />
          <br className="d-md-none" />
        </div>
      </div>
      <div className="col" style={{ background: "#9BEBF6" }}>
        <div className="w-50 bg-light m-auto">
          <Image
            className="w-100 h-auto"
            src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/hero.jpeg"
            width="457"
            height="839"
            // sizes="(min-width: 768px) 25vw, 50vw"
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
