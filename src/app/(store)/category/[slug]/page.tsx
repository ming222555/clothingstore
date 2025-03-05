import type { Metadata } from "next";

import {
  getProductsCategoryAction,
  getCategoryAction,
} from "@/actions/cart-actions";
import CategoryProducts from "@/ui/category/products";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryAction(slug);

  if (!category || "error" in category) {
    return {
      title: slug + " Category - Your Nextjs Store",
      description: slug,
    };
  } else {
    return {
      title: category.name + " Category - Your Nextjs Store",
      description: category.name,
    };
  }
}

export default async function CategoryPage(props: { params: Params }) {
  const { slug } = await props.params;

  const products = await getProductsCategoryAction(slug);
  const productsAry = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
  }

  const category = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="Page">
      <CategoryProducts category={category} products={productsAry} />
    </div>
  );
}
