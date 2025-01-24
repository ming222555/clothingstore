import Image from "next/image";

import type { Cart } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";

export default async function CartSummaryTable({ cart }: { cart: Cart }) {
  console.log("CartSummaryTable cart", cart);
  return (
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
        <tr>
          <td className="CartSummaryTable__td-image d-none d-sm-table-cell">
            <Image
              src="/popo.jpg"
              width={80}
              height={80}
              alt=""
              className="d-block"
            />
          </td>
          <td>
            <YnsLink href="/product/horizon-gaze-sunglasses">
              Horizon Gaze Sunglasses
            </YnsLink>
          </td>
          <td>$20.00</td>
          <td>
            <span className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-1">
              <button>
                <span>-</span>
              </button>
              <span>1</span>
              <button>
                <span>+</span>
              </button>
            </span>
          </td>
          <td className="text-end" width={16}>
            $201.00
          </td>
        </tr>
        <tr>
          <td className="CartSummaryTable__td-image d-none d-sm-table-cell">
            <Image
              src="/popo.jpg"
              width={80}
              height={80}
              alt=""
              className="d-block"
            />
          </td>
          <td>
            <YnsLink href="/product/sunbeam-tote-jeff">
              Sunbeam Tote Jeff
            </YnsLink>
          </td>

          <td>$25.00</td>
          <td>
            <span className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-1">
              <button>
                <span>-</span>
              </button>
              <span>1</span>
              <button>
                <span>+</span>
              </button>
            </span>
          </td>
          <td className="text-end">
            <span className="text-break">$662588888888888888.00</span>{" "}
            {/* text-nowrap */}
          </td>
        </tr>
        <tr>
          <td className="CartSummaryTable__td-image d-none d-sm-table-cell"></td>
          <td colSpan={3} className="text-end pe-3">
            TOTAL
          </td>
          <td className="text-end">$45.00</td>
        </tr>
      </tbody>
    </table>
  );
}
