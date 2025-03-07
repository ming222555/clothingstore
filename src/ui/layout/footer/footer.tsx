import YnsLink from "@/ui/yns-link";

export default function Footer() {
  return (
    <footer className="py-5 px-3 bg-light mt-5">
      <div
        className="d-flex justify-content-center flex-wrap column-gap-5 m-auto"
        style={{
          maxWidth: "var(--bs-breakpoint-xl)",
        }}
      >
        <div className="me-3">
          <h3 className="h6 fw-bold">Products</h3>
          <ul className="p-0">
            <li>
              <YnsLink
                href="/category/apparel"
                className="form-text underline-on-hover fw-bold"
              >
                Apparel
              </YnsLink>
            </li>
            <li>
              <YnsLink
                href="/category/accessories"
                className="form-text underline-on-hover fw-bold"
              >
                Accessories
              </YnsLink>
            </li>
          </ul>
        </div>
        <div className="ms-3">
          <h3 className="h6 fw-bold">Support</h3>
          <ul className="p-0">
            <li>
              <YnsLink
                href="mailto:hi@yournextjsstore.com"
                className="form-text underline-on-hover fw-bold"
              >
                Contact Us
              </YnsLink>
            </li>
          </ul>
        </div>
        <div className="w-100 text-center">
          <span className="form-text text-body-tertiary">
            <span className="d-block">&#169; 2024 Your Nextjs Store</span>
            <span className="d-block">Commerce made a delight for all</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
