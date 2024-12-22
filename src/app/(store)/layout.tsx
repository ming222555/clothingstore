import MainNav from "@/ui/main-nav/main-nav";
import Footer from "@/ui/footer/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
