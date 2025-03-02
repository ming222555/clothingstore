import { getProductsAllAction } from "@/actions/cart-actions";
import AllProducts from "@/ui/products/all-products";

export default async function AllProductsPage() {
  const products = await getProductsAllAction();
  const allProducts = Array.isArray(products) ? products : [];

  if (Array.isArray(products)) {
    //
  } else {
    console.log("error", products.error);
  }

  return (
    <div className="Page">
      <AllProducts allProducts={allProducts} />
    </div>
  );
}
