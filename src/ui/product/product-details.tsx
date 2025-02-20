import SingleProductPageClient from "./product-client";

export default function ProductDetails() {
  return (
    <div className="ProductDetails row g-0 row-cols-1 row-cols-md-2">
      <div className="col-12 d-md-none mb-3">
        <h1 className="h2 fw-semibold mb-1">Weekend Travel Bag</h1>
        <p className="h4 text-body-tertiary">$800.00</p>
      </div>
      <div className="col-md-7 border border-1">Pic</div>
      <div className="ProductDetails__description col-md-5 border border-1">
        <div className="d-none d-md-block">
          <h1 className="h2 fw-semibold mb-1">Weekend Travel Bag</h1>
          <p className="h4 text-body-tertiary">$800.00</p>
        </div>
        <div>
          <p className="py-3">
            Lightweight and durable, designed for weekend getaways.
          </p>
          <SingleProductPageClient />
        </div>
      </div>
    </div>
  );
}
