import CartModal from "@/ui/cart-modal/cart-modal";

export default async function CartModalPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string }>;
}) {
  const add = (await searchParams).add;

  return <CartModal add={add} />;
}
