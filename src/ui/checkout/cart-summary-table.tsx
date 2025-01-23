import Image from "next/image";

import type { Cart } from "@/lib/commerce-kit";
import YnsLink from "@/ui/yns-link";

export default async function CartSummaryTable({ cart }: { cart: Cart }) {
  console.log("CartSummaryTable cart", cart);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">
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
          <th scope="row">
            <Image src="/popo.jpg" width={80} height={80} alt="" />
          </th>
          <td>
            <YnsLink href="/product/horizon-gaze-sunglasses">
              Horizon Gaze Sunglasses
            </YnsLink>
          </td>
          <td>$20.00</td>
          <td className="text-end">
            <span>
              <button>
                <span>-</span>
              </button>
              <span>1</span>
              <button>
                <span>+</span>
              </button>
            </span>
          </td>
          <td className="text-end">$20.00</td>
        </tr>
        <tr>
          <th scope="row">
            <Image src="/popo.jpg" width={80} height={80} alt="" />
          </th>
          <td>
            <YnsLink href="/product/sunbeam-tote-jeff">
              Sunbeam Tote Jeff
            </YnsLink>
          </td>

          <td>$25.00</td>
          <td className="text-end">
            <span>
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
            <span className="text-nowrap">$6625.00</span>
          </td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td colSpan={3} className="text-end pe-3">
            TOTAL
          </td>
          <td className="text-end">$45.00</td>
        </tr>
      </tbody>
    </table>
  );
}
