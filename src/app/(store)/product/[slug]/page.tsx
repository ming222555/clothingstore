import Image from "next/image";
import { redirect } from "next/navigation";

import YnsLink from "@/ui/yns-link";
import ProductDetails from "@/ui/product/product-details";
import { getProductAction } from "@/actions/cart-actions";

type Params = Promise<{ slug: string }>;

export default async function SingleProductPage(props: { params: Params }) {
  const { slug } = await props.params;

  const product = await getProductAction(slug);

  if (!product) {
    redirect("/not-found");
  }

  return (
    <div className="Page">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pb-3">
            <li className="breadcrumb-item form-text">
              <YnsLink href="/products">All products</YnsLink>
            </li>
            <li className="breadcrumb-item form-text">
              <YnsLink href="/category/apparel">Apparel</YnsLink>
            </li>
            <li
              className="breadcrumb-item form-text fw-medium active"
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </nav>
        <ProductDetails product={product} />
      </div>
      <div className="mb-5">
        <h2 className="h4 fw-semibold mt-5 mb-4">You May Also Like</h2>
        <div className="row g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 bg-body-tertiary">
          <div className="col">
            <div className="m-2 shadow-sm hover-opacity-75">
              <YnsLink href="/product/beach-pattern-tee" className="d-block">
                <Image
                  className="w-100 h-auto product-image"
                  src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                  loading="lazy"
                  alt=""
                />
              </YnsLink>
              <div>
                <h3 className="h5 fw-semibold">
                  <YnsLink
                    href="/product/beach-pattern-tee"
                    className="d-inline-block pt-3 text-dark"
                  >
                    Beach Pattern Tee
                  </YnsLink>
                </h3>
                <div className="pb-3">
                  <span className="h6">$50.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="m-2 shadow-sm hover-opacity-75">
              <YnsLink href="/product/beach-pattern-tee" className="d-block">
                <Image
                  className="w-100 h-auto product-image"
                  src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                  loading="lazy"
                  alt=""
                />
              </YnsLink>
              <div>
                <h3 className="h5 fw-semibold">
                  <YnsLink
                    href="/product/beach-pattern-tee"
                    className="d-inline-block pt-3 text-dark"
                  >
                    Beach Pattern Tee
                  </YnsLink>
                </h3>
                <div className="pb-3">
                  <span className="h6">$50.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="m-2 shadow-sm hover-opacity-75">
              <YnsLink href="/product/beach-pattern-tee" className="d-block">
                <Image
                  className="w-100 h-auto product-image"
                  src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                  loading="lazy"
                  alt=""
                />
              </YnsLink>
              <div>
                <h3 className="h5 fw-semibold">
                  <YnsLink
                    href="/product/beach-pattern-tee"
                    className="d-inline-block pt-3 text-dark"
                  >
                    Beach Pattern Tee
                  </YnsLink>
                </h3>
                <div className="pb-3">
                  <span className="h6">$50.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="m-2 shadow-sm hover-opacity-75">
              <YnsLink href="/product/beach-pattern-tee" className="d-block">
                <Image
                  className="w-100 h-auto product-image"
                  src="https://yournextjsstore.s3.ap-southeast-1.amazonaws.com/images/tshirts/Beach_Pattern_T_Shirt.jpeg"
                  width="736"
                  height="736"
                  sizes="(min-width: 1200px) 267px, (min-width: 780px) calc(33.5vw - 32px), (min-width: 580px) calc(50vw - 36px), calc(100vw - 52px)"
                  loading="lazy"
                  alt=""
                />
              </YnsLink>
              <div>
                <h3 className="h5 fw-semibold">
                  <YnsLink
                    href="/product/beach-pattern-tee"
                    className="d-inline-block pt-3 text-dark"
                  >
                    Beach Pattern Tee
                  </YnsLink>
                </h3>
                <div className="pb-3">
                  <span className="h6">$50.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
