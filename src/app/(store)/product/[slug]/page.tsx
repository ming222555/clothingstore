import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
        <Breadcrumb className="mt-3 mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">All products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${product.category_id}`}>
                {product.category_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductDetails product={product} />
      </div>
      <SimilarProducts productId={slug} products={productsAry} />
    </div>
  );
}
