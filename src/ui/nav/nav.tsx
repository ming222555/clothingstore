import Link from "next/link";

import LogoNav from "./logo-nav";
// import CartSummaryNav from "./cart-summary-nav";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <LogoNav />
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/category/apparel">Apparel</Link>
          </li>
          <li>
            <Link href="/category/accessories">Accessories</Link>
          </li>
          <li>
            <Link href="/category/digital">Digital</Link>
          </li>
          <li>{/* <Search /> */}</li>
          <li>{/* <CartSummaryNav /> */}</li>
        </ul>
      </nav>
    </header>
  );
}
