import type { Metadata } from "next";

import { getProductsAllAction } from "@/actions/cart-actions";
import AllProducts from "@/ui/products/products";

export const metadata: Metadata = {
  title: "All Products - Your Nextjs Store",
  description: "All Products",
};

export default async function AllProductsPage() {
  const products = await getProductsAllAction();
  const productsAry = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
  }

  return (
    <div className="Page">
      <AllProducts products={productsAry} />
    </div>
  );
}
