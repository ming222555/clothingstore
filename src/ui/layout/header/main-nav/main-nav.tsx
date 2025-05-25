import LogoNav from "./logo-nav";
import NavMenu from "./nav-menu";
import SearchNav from "./search-nav";
import NavMenuAside from "./nav-menu-aside";
import CartSummaryNav from "./cart-summary-nav";

export default function MainNav() {
  return (
    <header className="p-3 bg-white opacity-97 border-b sticky top-0 z-1">
      {/* bg-red-300 */}
      <nav
        className="flex items-center m-auto relative"
        style={{
          maxWidth: "var(--breakpoint-xl)",
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
