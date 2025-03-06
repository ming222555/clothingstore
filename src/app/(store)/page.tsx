import Image from "next/image";

import { getProductsFeaturedAction } from "@/actions/cart-actions";
import FeaturedProducts from "@/ui/home/products";
import YnsLink from "@/ui/yns-link";

export default async function HomePage() {
  const products = await getProductsFeaturedAction();
  const productsAry = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
  }

  return (
    <div className="Page">
      Home page
      <div className="row row-cols-1 row-cols-md-2 g-0">
        <div className="col d-flex align-items-center bg-info">
          <div className="w-75 bg-warning m-auto">
            <h2>Discover our Curated Collection</h2>
            <p>
              Explore our carefully selected products for your home and
              lifestyle.
            </p>
            <YnsLink
              className="btn btn-dark rounded-pill px-3"
              href="/category/accessories"
            >
              Shop Now
            </YnsLink>
          </div>
        </div>
        <div className="col" style={{ background: "#F6F6F8" }}>
          <div className="w-80 bg-light m-auto">
            <Image
              className="w-100 h-auto"
              src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/hero.jpeg"
              width="466"
              height="580"
              // sizes="(min-width: 768px) 25vw, 50vw"
              sizes="(min-width: 1320px) 300px, (min-width: 780px) calc(21.73vw + 18px), calc(50vw - 16px)"
              loading="eager"
              priority
              alt=""
            />
          </div>
        </div>
      </div>
      <FeaturedProducts products={productsAry} />
      <div>
        <p>Basic verify Bootstrap flex, grid, and utilities</p>
        <br />
        <div className="container text-center text-primary">
          <div
            className="row align-items-start"
            style={{ background: "lightgreen" }}
          >
            <div
              className="col-3 order-last"
              style={{ outline: "1px solid blue" }}
            >
              1 in Dom, col-3 order-last
            </div>
            <div className="col-md-5" style={{ outline: "1px solid blue" }}>
              col-md-5
            </div>
            <div
              className="col align-self-center"
              style={{ outline: "1px solid blue" }}
            >
              <p className="bg-info p-2">col</p>
            </div>
            <span className="d-none">span</span>
          </div>
        </div>
      </div>
      <br />
      <button className="btn btn-info">Bootstrap button</button>
    </div>
  );
}
