import { CartModalProvider } from "@/providers/cart-modal-provider";
import MainNav from "@/ui/main-nav/main-nav";
import Footer from "@/ui/footer/footer";
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
      <main>
        {children}
        {<CartModal />}
      </main>
      <Footer />
    </CartModalProvider>
  );
}
