import AddToCartButton from "@/ui/add-to-cart/add-to-cart-button";

export default function SingleProductPage() {
  return (
    <div>
      SingleProductPage <AddToCartButton productId="one-shoe" />{" "}
      <AddToCartButton productId="gloves-with-holes" />
      <AddToCartButton productId="sunbeam-tote-ray-tomasz" />
    </div>
  );
}
