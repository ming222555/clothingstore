import { CartModalProvider } from "@/providers/cart-modal-provider";
import MainNav from "@/ui/layout/header/main-nav/main-nav";
import Footer from "@/ui/layout/footer/footer";
import CartModal from "@/ui/cart-modal/cart-modal";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("LLLLLLLLLLLLLLLLLLLLayout");
  return (
    <CartModalProvider>
      <MainNav />
      <main className="p-3 m-auto">
        {children}
        {<CartModal />}
      </main>
      <Footer />
    </CartModalProvider>
  );
}
