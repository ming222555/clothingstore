"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import { formatMoney } from "@/lib/utils/utils";

export default function ShoppingBagIconTooltip({
  tooltipId,
  totalItems,
  total,
  currency,
}: {
  tooltipId: string;
  totalItems: number;
  total: number;
  currency: string;
}) {
  return (
    <ReactTooltip id={tooltipId} place="left" variant="info">
      <div>
        <p className="p-0 m-0">
          {`${totalItems} item${totalItems > 1 ? "s" : ""}`} in cart
        </p>
        <p className="p-0 m-0">Total: {formatMoney(total, currency)}</p>
      </div>
    </ReactTooltip>
  );
}
