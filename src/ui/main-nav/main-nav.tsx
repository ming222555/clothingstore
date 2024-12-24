import { ShoppingBagIcon } from "lucide-react";

import LogoNav from "./logo-nav";
import NavMenu from "./nav-menu";
import SearchNav from "./search-nav";
import NavMenuAside from "./nav-menu-aside";

// import CartSummaryNav from "./cart-summary-nav";

export default function MainNav() {
  return (
    <header className="p-3 bg-secondary position-sticky top-0">
      <nav
        className="d-flex align-items-center m-auto bg-info position-relative"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <LogoNav />
        <NavMenu />
        <SearchNav />
        <div>
          <div className="ms-3 opacity-25">
            <ShoppingBagIcon />
          </div>
        </div>
        <NavMenuAside />
        {/* <li><CartSummaryNav /></li> */}
      </nav>
    </header>
  );
}
