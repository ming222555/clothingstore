import MainNav from "@/ui/main-nav/main-nav";
import Footer from "@/ui/footer/footer";

export default function StoreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main>
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
