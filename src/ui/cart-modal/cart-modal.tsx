import CartModalBackdrop from "./cart-modal-backdrop";
import YnsLink from "@/ui/yns-link";

export default function CartModal() {
  return (
    <>
      <CartModalBackdrop />
      <div className="CartModal d-flex flex-column bg-light position-fixed bottom-0 start-100">
        <header className="d-flex p-3">
          <h2 className="h5 fw-semibold me-auto">Shopping Cart</h2>
          <YnsLink
            href="/cart"
            className="text-decoration-underline fs-0875 text-black-50"
          >
            (open full view)
          </YnsLink>
        </header>
        <ul className="flex-grow-1 p-3 m-0 overflow-auto">
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
          <li>line 1</li>
          <li>line 2</li>
          <li>line 3</li>
        </ul>
        <hr className="m-0 mb-2" />
        <div className="p-3">
          <div className="d-flex justify-content-between fw-medium">
            <span>Total</span>
            <span className="fs-12">$7,915.00</span>
          </div>
          <p className="text-black-50 fs-0875 mb-3">
            Shipping and taxes will be added at the next step
          </p>
          <YnsLink
            href="/cart"
            className="btn btn-dark rounded-pill w-100 my-2"
          >
            Go to payment
          </YnsLink>
        </div>
      </div>
    </>
  );
}
