import YnsLink from "@/ui/yns-link";
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
            <YnsLink href="/">Home</YnsLink>
          </li>
          <li>
            <YnsLink href="/category/apparel">Apparel</YnsLink>
          </li>
          <li>
            <YnsLink href="/category/accessories">Accessories</YnsLink>
          </li>
          <li>
            <YnsLink href="/category/digital">Digital</YnsLink>
          </li>
          <li>{/* <Search /> */}</li>
          <li>{/* <CartSummaryNav /> */}</li>
        </ul>
      </nav>
    </header>
  );
}
