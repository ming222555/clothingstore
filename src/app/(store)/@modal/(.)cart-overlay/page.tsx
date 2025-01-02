import CartModal from "@/ui/cart-modal/cart-modal";

export default async function CartModalPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string }>;
}) {
  const add = (await searchParams).add;
  console.log("HHHHHHHHHHHHHHgggggggg CartModalPage");
  return <CartModal add={add} />;
}
