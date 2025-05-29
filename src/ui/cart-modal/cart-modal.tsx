import Image from "next/image";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";
import CartModalBackdrop from "./cart-modal-backdrop";
import { formatMoney } from "@/lib/utils/utils";
import GoToPayment from "./go-to-payment";

export default async function CartModal() {
  const cart = await getCartFromCookiesAction();

  if (!cart || cart.lines.length === 0) {
    return null;
  }

  const total = await Commerce.calculateCartTotalNetWithoutShipping(cart!);

  return (
    <>
      <CartModalBackdrop />
      <div className="peer-[.open]:-translate-x-full transition-all duration-1000 flex flex-col bg-gray-100 fixed bottom-0 left-full z-1 w-full h-[80%] sm:w-[50%] sm:h-full lg:w-[33.3%]">
        <header className="flex p-3">
          <h2 className="h5 font-medium me-auto">Shopping Cart</h2>
          <GoToPayment>(open full view)</GoToPayment>
        </header>
        <ul className="flex-grow p-3 pt-0 m-0 overflow-auto">
          {cart.lines.map((line) => (
            <li className="py-4 not-last:border-b" key={line.product_id}>
              <div className="flex">
                <Image
                  className="self-center"
                  src={line.img_src}
                  width="64"
                  height="64"
                  sizes="(min-width: 1px) 64px"
                  loading="lazy"
                  alt=""
                />
                <div className="flex-grow flex flex-col mx-3">
                  <p className="leading-[1.25] p-0 m-0 flex-grow font-bold">
                    {line.name}
                  </p>
                  <p className="text-sm font-medium p-0 mt-2 mb-0 text-gray-500">
                    Quantity: {line.qty}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  <p>${line.unit_price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr className="m-0 mb-2" />
        <div className="p-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatMoney(total, cart.currency)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Shipping and taxes will be added at the next step
          </p>
          <GoToPayment isButton>Go to payment</GoToPayment>
        </div>
      </div>
    </>
  );
}
