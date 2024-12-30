import Image from "next/image";

import CartModalBackdrop from "./cart-modal-backdrop";
import YnsLink from "@/ui/yns-link";

export default function CartModal() {
  const cart = {
    currency: "USD",
    total: 750350.94,
    lines: [
      {
        product: {
          id: "watch",
          name: "Watch",
          imgSrc: "/prod123.jpg",
          unit_price: 249999,
          qty: 3,
        },
      },
      {
        product: {
          id: "single-sock",
          name: "Single sock",
          imgSrc: "/prod123.jpg",
          unit_price: 4.99,
          qty: 6,
        },
      },
      {
        product: {
          id: "one-shoe",
          name: "One shoe",
          imgSrc: "/prod123.jpg",
          unit_price: 299,
          qty: 1,
        },
      },
      {
        product: {
          id: "sunbeam-tote-ray-tomasz",
          name: "Sunbeam Tote Ray Tomasz",
          imgSrc: "/prod123.jpg",
          unit_price: 25,
          qty: 1,
        },
      },
    ],
  };

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
        <ul className="flex-grow-1 p-3 pt-0 m-0 overflow-auto">
          {cart.lines.map((line) => (
            <li
              className="py-4 border-bottom border-secondary-subtle"
              key={line.product.id}
            >
              <div className="d-flex">
                <div
                  className="position-relative bg-warning align-self-center"
                  style={{
                    width: "3.8rem",
                    height: "3.8rem",
                    outline: "1px solid blue",
                  }}
                >
                  <Image src={line.product.imgSrc} fill alt="" />
                </div>
                <div className="flex-grow-1 d-flex flex-column bg-warning mx-3">
                  <p className="CartModal__product-name p-0 m-0 flex-grow-1 fw-semibold">
                    {line.product.name}
                  </p>
                  <p className="fs-0875 fw-medium p-0 mt-2 mb-0 bg-info text-black-50">
                    Quantity: {line.product.qty}
                  </p>
                </div>
                <div className="fs-0875 fw-medium bg-warning">
                  <p>${line.product.unit_price}</p>
                </div>
              </div>
            </li>
          ))}
          {/* <li className="py-4 border-bottom border-secondary-subtle">
            <div className="d-flex">
              <div
                className="position-relative bg-warning align-self-center"
                style={{
                  width: "3.8rem",
                  height: "3.8rem",
                  outline: "1px solid blue",
                }}
              >
                <Image src="/pop.jpg" fill alt="" />
              </div>
              <div className="flex-grow-1 d-flex flex-column bg-warning mx-3">
                <p className="CartModal__product-name p-0 m-0 flex-grow-1 fw-semibold">
                  One shoe
                </p>
                <p className="fs-0875 fw-medium p-0 mt-2 mb-0 bg-info">
                  Quantity: 1
                </p>
              </div>
              <div className="fs-0875 fw-medium bg-warning">
                <p>$299.00</p>
              </div>
            </div>
          </li>
          <li className="py-4 border-bottom border-secondary-subtle">
            <div className="d-flex">
              <div
                className="position-relative bg-warning align-self-center"
                style={{
                  width: "3.8rem",
                  height: "3.8rem",
                  outline: "1px solid blue",
                }}
              >
                <Image src="/pop.jpg" fill alt="" />
              </div>
              <div className="flex-grow-1 d-flex flex-column bg-warning mx-3">
                <p className="CartModal__product-name p-0 m-0 flex-grow-1 fw-semibold">
                  Sunbeam Tote Ray Tomasz
                </p>
                <p className="fs-0875 fw-medium p-0 mt-2 mb-0 bg-info">
                  Quantity: 1
                </p>
              </div>
              <div className="fs-0875 fw-medium bg-warning">
                <p>$299.00</p>
              </div>
            </div>
          </li> */}
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
