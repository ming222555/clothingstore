import { redirect } from "next/navigation";
import type { Metadata } from "next";

import YnsLink from "@/ui/yns-link";
import ProductDetails from "@/ui/product/product-details";
import SimilarProducts from "@/ui/product/products";
import {
  getProductAction,
  getProductsSimilarAction,
  getProductForHtmlHeadAction,
} from "@/actions/cart-actions";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForHtmlHeadAction(slug);

  if (!product || "error" in product) {
    return {
      title: slug + " - Your Nextjs Store",
      description: slug,
    };
  } else {
    return {
      title: product.name + " - Your Nextjs Store",
      description: product.description,
    };
  }
}

export default async function SingleProductPage(props: { params: Params }) {
  const { slug } = await props.params;

  const product = await getProductAction(slug);

  if (!product) {
    redirect("/not-found");
  }

  const products = await getProductsSimilarAction(slug);
  const productsAry = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
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
              <YnsLink href={`/category/${product.category_id}`}>
                {product.category_name}
              </YnsLink>
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
      <SimilarProducts productId={slug} products={productsAry} />
    </div>
  );
}
