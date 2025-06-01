"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useOptimistic, useRef } from "react";
import CartItemQuantity from "./cart-item-quantity";
import { formatMoney } from "@/lib/utils/utils";
import type { Cart, DbShippingRate } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";

export type Delta = "INCREASE" | "DECREASE";

export type OptimisticCartActionType = {
  productId: string;
  delta: Delta;
};

export default function CartSummaryTable({
  cart,
  shippingRate,
  total,
}: {
  cart: Cart;
  shippingRate: DbShippingRate | null;
  total: number;
}) {
  const actionProductId = useRef("");
  const [optimisticCart, dispatchOptimisticCartAction] = useOptimistic<
    Cart,
    OptimisticCartActionType
  >(cart, (prevCart, action) => {
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
    <form className="pe-2">
      <Table className="table-fixed w-full align-middle">
        <TableHeader>
          <TableRow className="text-sm hover:bg-transparent">
            <TableHead scope="col" className="w-[96px] hidden sm:table-cell">
              <span className="block visually-hidden">Image</span>
            </TableHead>
            <TableHead scope="col" className="font-medium text-gray-500">
              Product
            </TableHead>
            <TableHead scope="col" className="font-medium text-gray-500">
              Price
            </TableHead>
            <TableHead scope="col" className="font-medium text-gray-500">
              Quantity
            </TableHead>
            <TableHead
              scope="col"
              className="text-end font-medium text-gray-500"
            >
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticCart.lines.map((line) => (
            <TableRow key={line.product_id} className="text-sm">
              <TableCell className="w-[96px] hidden sm:table-cell">
                <Image
                  className="block"
                  src={line.img_src}
                  width="80"
                  height="80"
                  sizes="(min-width: 1px) 80px"
                  loading="lazy"
                  alt=""
                />
              </TableCell>
              <TableCell className="text-blue-500">
                <YnsLink href={`/product/${line.product_id}`}>
                  <span className="text-wrap">{line.name}</span>
                </YnsLink>
              </TableCell>
              <TableCell className="text-gray-500">
                {formatMoney(line.unit_price, cart.currency)}
              </TableCell>
              <TableCell className="text-gray-500">
                <CartItemQuantity
                  qty={line.qty}
                  productId={line.product_id}
                  onChange={dispatchOptimisticCartAction}
                  actionProductId={actionProductId.current}
                />
              </TableCell>
              <TableCell className="text-gray-500 text-end">
                {formatMoney(line.line_total, cart.currency)}
              </TableCell>
            </TableRow>
          ))}
          {shippingRate ? (
            <TableRow>
              <TableCell className="w-[96px] hidden sm:table-cell"></TableCell>
              <TableCell colSpan={3} className="text-sm text-gray-800">
                {shippingRate.agency} {shippingRate.duration}
              </TableCell>
              <TableCell className="text-sm text-gray-800 text-end">
                {formatMoney(shippingRate.rate, cart.currency)}
              </TableCell>
            </TableRow>
          ) : null}
          <TableRow className="bg-gray-200">
            <TableCell className="w-[96px] hidden sm:table-cell"></TableCell>
            <TableCell colSpan={3} className="text-end pe-3 h6 font-bold">
              TOTAL
            </TableCell>
            <TableCell className="text-end h6 font-bold">
              {formatMoney(total, cart.currency)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
