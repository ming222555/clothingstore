import LogoNav from "./logo-nav";
import NavMenu from "./nav-menu";
import SearchNav from "./search-nav";
import NavMenuAside from "./nav-menu-aside";
import CartSummaryNav from "./cart-summary-nav";
import Link from "next/link";

export default function MainNav() {
  return (
    <header className="p-3 bg-secondary position-sticky top-0">
      <nav
        className="d-flex align-items-center m-auto bg-info position-relative"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <Link href="/product/one-shoe">Product one shoe</Link>
        <LogoNav />
        <NavMenu />
        <SearchNav />
        <CartSummaryNav />
        <NavMenuAside />
      </nav>
    </header>
  );
}
