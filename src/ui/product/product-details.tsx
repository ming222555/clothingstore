import SingleProductPageClient from "./product-client";

export default function ProductDetails() {
  return (
    <div className="ProductDetails row g-0 row-cols-1 row-cols-md-2">
      <div className="col-12 bg-info d-md-none">
        <h1 className="h2 fw-semibold">Weekend Travel Bag</h1>
        <p className="h4">$800.00</p>
      </div>
      <div className=" bg-primary text-white col-md-7 border border-1">Pic</div>
      <div className="ProductDetails__description bg-primary text-white col-md-5 border border-1">
        <div className="bg-warning d-none d-md-block">
          <h1 className="h2 fw-semibold">Weekend Travel Bag</h1>
          <p className="h4">$800.00</p>
        </div>
        <div>
          <p>Lightweight and durable, designed for weekend getaways.</p>
          <SingleProductPageClient />
        </div>
      </div>
    </div>
  );
}
