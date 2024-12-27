import { redirect } from "next/navigation";

export default function RedirectToCart() {
  redirect("/cart");
}
