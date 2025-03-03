import { getProductsCategoryAction } from "@/actions/cart-actions";
import CategoryProducts from "@/ui/category/products";

type Params = Promise<{ slug: string }>;

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
