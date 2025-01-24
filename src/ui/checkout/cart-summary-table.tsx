"use client";

import Image from "next/image";

import { useOptimistic, useRef } from "react";
import CartItemQuantity from "./cart-item-quantity";
import { formatMoney } from "@/lib/utils/utils";
import type { Cart } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";

export type Delta = "INCREASE" | "DECREASE";

export type OptimisticCartActionType = {
  productId: string;
  delta: Delta;
};

export default function CartSummaryTable({ cart }: { cart: Cart }) {
  console.log("CartSummaryTable cart", cart);
  const actionProductId = useRef("");
  const [optimisticCart, dispatchOptimisticCartAction] = useOptimistic<
    Cart,
    OptimisticCartActionType
  >(cart, (prevCart, action) => {
    // console.log("prevCart", prevCart);
    actionProductId.current = action.productId;
    return {
      ...prevCart,
      lines: prevCart.lines.map((line) => {
        if (line.product_id !== action.productId) {
          return line;
        }
        return {
          ...line,
          qty: action.delta === "INCREASE" ? line.qty + 1 : line.qty - 1,
        };
      }),
    };
  });

  return (
    <form>
      <table className="CartSummaryTable table table-bordered table-sm align-middle">
        <thead>
          <tr>
            <th
              scope="col"
              className="CartSummaryTable__th-image d-none d-sm-table-cell"
            >
              <span className="visually-hidden">Image</span>
            </th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col" className="text-end">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {optimisticCart.lines.map((line) => (
            <tr key={line.product_id}>
              <td className="CartSummaryTable__td-image d-none d-sm-table-cell">
                <Image
                  src={line.img_src}
                  width={80}
                  height={80}
                  alt=""
                  className="d-block"
                />
              </td>
              <td>
                <YnsLink href="/product/horizon-gaze-sunglasses">
                  {line.name}
                </YnsLink>
              </td>
              <td>{formatMoney(line.unit_price, cart.currency)}</td>
              <td>
                <CartItemQuantity
                  qty={line.qty}
                  productId={line.product_id}
                  onChange={dispatchOptimisticCartAction}
                  actionProductId={actionProductId.current}
                />
              </td>
              <td className="text-end" width={16}>
                $201.00 TODO
              </td>
            </tr>
          ))}
          <tr>
            <td className="CartSummaryTable__td-image d-none d-sm-table-cell"></td>
            <td colSpan={3} className="text-end pe-3">
              TOTAL
            </td>
            <td className="text-end">$45.00 TODO</td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
