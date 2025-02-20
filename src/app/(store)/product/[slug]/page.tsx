import YnsLink from "@/ui/yns-link";
import ProductDetails from "@/ui/product/product-details";

export default function SingleProductPage() {
  return (
    <div className="Page">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pb-3">
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
        <ProductDetails />
      </div>
      <div className="mb-5">
        <h2 className="h4 fw-semibold mt-5 mb-4">You May Also Like</h2>
        <div className="row g-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 text-center">
          <div className="col bg-warning border border-1 border-dark">
            <div className="m-2 bg-info">Pic1</div>
          </div>
          <div className="col bg-warning border border-1 border-dark">Pic2</div>
          <div className="col bg-warning border border-1 border-dark">Pic3</div>
          <div className="col bg-warning border border-1 border-dark">Pic4</div>
        </div>
      </div>
    </div>
  );
}
