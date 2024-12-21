import { SearchIcon, ShoppingBagIcon, MenuIcon } from "lucide-react";

import YnsLink from "@/ui/yns-link";
import LogoNav from "./logo-nav";
// import CartSummaryNav from "./cart-summary-nav";

export default function Nav() {
  return (
    <header className="p-3 bg-secondary">
      <nav
        className="d-flex align-items-center m-auto bg-info"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <LogoNav />
        {/* <div
          className="d-none d-sm-flex bg-secondary"
          // className="d-flex bg-secondary"
          //  className="d-flex bg-secondary overflow-auto"
          // style={{ minWidth: "20.5rem" }}
          style={{ outline: "3px solid yellow" }}
        > */}
        <YnsLink
          href="/"
          className="d-none d-sm-flex btn btn-light me-1"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Home
        </YnsLink>
        <YnsLink
          href="/category/apparel"
          className="d-none d-sm-flex btn btn-light me-1"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Apparel
        </YnsLink>
        <YnsLink
          href="/category/accessories"
          className="d-none d-sm-flex btn btn-light me-1"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Accessories
        </YnsLink>
        <YnsLink
          href="/category/digital"
          className="d-none d-sm-flex btn btn-light me-1"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Digital
        </YnsLink>
        {/* </div> */}
        <div className="ms-auto d-md-none">
          <SearchIcon />
        </div>
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
