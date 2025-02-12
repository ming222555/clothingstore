"use server";

import { redirect } from "next/navigation";
import { gateway } from "@/config/braintree";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";

export async function getBraintreeClientTokenAction() {
  try {
    const res = await gateway.clientToken.generate({});
    return { clientToken: res.clientToken, error: "" };
  } catch (err) {
    console.log(err);
    return {
      clientToken: "",
      error: "Error generating braintree client token",
    };
  }
}

export async function braintreeMakePaymentAction(
  nonce: string,
  custEmail: string
) {
  if (!nonce) {
    console.log("Nonce is missing");
    redirect("/checkout-error?error=" + encodeURIComponent("Nonce is missing"));
  }
  const cart = await getCartFromCookiesAction();

  if (!cart) {
    redirect("/checkout-error?error=" + encodeURIComponent("Cart not found"));
  }
  if (!cart.lines.length) {
    redirect(
      "/checkout-error?error=" + encodeURIComponent("Cart has no items")
    );
  }

  const cartTotalNetWithoutShipping =
    await Commerce.calculateCartTotalNetWithoutShipping(cart);

  const sr = await Commerce.getCartShippingRate(cart);
  const rate = sr ? sr.rate : 0;

  const total = cartTotalNetWithoutShipping + rate;

  if (!total) {
    console.log("TotalPrice is missing");
    redirect(
      "/checkout-error?error=" + encodeURIComponent("TotalPrice is missing")
    );
  }

  let message = "";
  let isSuccess = false;

  try {
    // Create payment
    const payment = await gateway.transaction.sale({
      amount: total.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    message = payment.message;
    isSuccess = payment.success;
  } catch (err) {
    console.log("Checkout failed", err);
    redirect("/checkout-error?error=" + encodeURIComponent(err as string));
  }

  if (!isSuccess) {
    console.log("Payment failed", message);
    redirect("/checkout-error?error=" + encodeURIComponent(message));
  }
  redirect("/checkout-success?cust_email=" + encodeURIComponent(custEmail));
}
