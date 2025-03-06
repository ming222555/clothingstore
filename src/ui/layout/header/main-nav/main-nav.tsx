import LogoNav from "./logo-nav";
import NavMenu from "./nav-menu";
import SearchNav from "./search-nav";
import NavMenuAside from "./nav-menu-aside";
import CartSummaryNav from "./cart-summary-nav";

export default function MainNav() {
  return (
    <header className="p-3 bg-white opacity-97 border-bottom position-sticky top-0 z-1">
      <nav
        className="d-flex align-items-center m-auto position-relative"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <LogoNav />
        <NavMenu />
        <SearchNav />
        <CartSummaryNav />
        <NavMenuAside />
      </nav>
    </header>
  );
}
