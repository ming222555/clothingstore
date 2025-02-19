import YnsLink from "@/ui/yns-link";
import SingleProductPageClient from "@/ui/product/product-client";

export default function SingleProductPage() {
  return (
    <div className="Page">
      <div className="bg-warning">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item form-text">
              <YnsLink href="/products">All products</YnsLink>
            </li>
            <li className="breadcrumb-item form-text">
              <YnsLink href="/category/apparel">Apparel</YnsLink>
            </li>
            <li
              className="breadcrumb-item form-text fw-medium active"
              aria-current="page"
            >
              One Shoe
            </li>
          </ol>
        </nav>
        <div className="row g-0 row-cols-1 row-cols-md-2">
          <div className="bg-warning d-md-none">
            <h1>H1 Ro</h1>
            <p>$123</p>
          </div>
          <div className=" bg-primary text-white col-md-7 border border-1">
            Pic
          </div>
          <div className="bg-primary text-white col-md-5 border border-1">
            <div className="bg-warning d-none d-md-block">
              <h1>H11 Ro</h1>
              <p>$123</p>
            </div>
            <div>
              <p>Convenient rolling</p>
              <SingleProductPageClient />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-danger">
        <h2 aria-label="breadcrumb">You May Also Like</h2>
        <div className="row g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 text-center">
          <div className="bg-warning border border-1 border-dark">Pic1</div>
          <div className="bg-warning border border-1 border-dark">Pic2</div>
          <div className="bg-warning border border-1 border-dark">Pic3</div>
          <div className="bg-warning border border-1 border-dark">Pic4</div>
        </div>
      </div>
    </div>
  );
}
