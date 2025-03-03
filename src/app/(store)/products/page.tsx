import { getProductsAllAction } from "@/actions/cart-actions";
import AllProducts from "@/ui/products/products";

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
