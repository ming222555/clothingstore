import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { CartEmpty } from "@/ui/checkout/cart-empty";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCartFromCookiesAction();
  if (!cart) {
    return <CartEmpty />;
  }
  if (!cart.lines.length) {
    return <CartEmpty />;
  }
  return <>{children}</>;
}
