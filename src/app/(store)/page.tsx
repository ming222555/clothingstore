import { getProductsFeaturedAction } from "@/actions/cart-actions";
import FeaturedProducts from "@/ui/home/products";
import Hero from "@/ui/home/hero";
import FeaturedCategories from "@/ui/home/categories";

export default async function HomePage() {
  const products = await getProductsFeaturedAction();
  const productsAry = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
  }

  return (
    <div className="Page mt-n3">
      <Hero />
      <FeaturedProducts products={productsAry} />
      <FeaturedCategories />
    </div>
  );
}
