import { SearchIcon, ShoppingBagIcon, MenuIcon } from "lucide-react";

// import YnsLink from "@/ui/yns-link";
import NavMenu from "@/ui/nav/nav-menu";
import LogoNav from "./logo-nav";
// import CartSummaryNav from "./cart-summary-nav";

export default function Nav() {
  return (
    <header className="p-3 bg-secondary">
      <nav
        className="d-flex align-items-center m-auto bg-info position-relative"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <LogoNav />
        <NavMenu />
        {/* <div
          className="ms-auto d-md-none position-absolute"
          style={{
            left: "100%",
          }}
        >
          <SearchIcon />
        </div> */}
        {/* <div className="MainNav__search d-none d-md-block ms-auto bg-warning">
          <input
            type="text"
            placeholder="Search for products..."
            style={{ fontSize: "0.875rem", padding: "0.2rem" }}
            className="w-100"
          />
        </div> */}
        <input
          type="text"
          placeholder="Search for products..."
          style={{ fontSize: "0.875rem", padding: "0.2rem" }}
          className="MainNav__searchInput d-none d-md-block ms-auto bg-warning"
        />
        <div>
          <div className="ms-3 opacity-25">
            <ShoppingBagIcon />
          </div>
        </div>
        <div className="ms-2 d-sm-none">
          <MenuIcon />
        </div>
        {/* <div>CartSummaryNav_Stub</div> */}
        {/* <li><Search /></li> */}
        {/* <li><CartSummaryNav /></li> */}
      </nav>
    </header>
  );
}
