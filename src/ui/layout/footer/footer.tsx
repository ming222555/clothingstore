import YnsLink from "@/ui/yns-link";

export default function Footer() {
  return (
    <footer className="py-5 px-3 bg-gray-100 mt-5">
      <div
        className="flex justify-center flex-wrap gap-x-5 m-auto"
        style={{
          maxWidth: "var(--breakpoint-xl)",
        }}
      >
        <div className="me-3">
          <h3 className="h6 font-medium pb-1">Products</h3>
          <ul className="p-0">
            <li>
              <YnsLink
                href="/category/apparel"
                className="text-sm font-light text-gray-600 hover:underline"
              >
                Apparel
              </YnsLink>
            </li>
            <li>
              <YnsLink
                href="/category/accessories"
                className="text-sm font-light text-gray-600 hover:underline"
              >
                Accessories
              </YnsLink>
            </li>
          </ul>
        </div>
        <div className="ms-3">
          <h3 className="h6 font-medium pb-1">Support</h3>
          <ul className="p-0">
            <li>
              <YnsLink
                href="mailto:hi@yournextjsstore.com"
                className="text-sm font-light text-gray-600 hover:underline"
              >
                Contact Us
              </YnsLink>
            </li>
          </ul>
        </div>
        <div className="w-full text-center my-6">
          <span className="text-xs text-gray-400">
            <span className="block">&#169; 2024 Your Nextjs Store</span>
            <span className="block">Commerce made a delight for all</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
