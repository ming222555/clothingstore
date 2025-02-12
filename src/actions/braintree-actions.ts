"use server";

import { redirect } from "next/navigation";
import { gateway } from "@/config/braintree";

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
  // todo determine totalPrice
  let totalPrice = 0;
  totalPrice = totalPrice + 123456.66;

  if (!nonce || !totalPrice) {
    console.log("Nonce or totalPrice is missing");
    redirect(
      "/checkout-error?error=" +
        encodeURIComponent("Nonce or totalPrice is missing")
    );
  }

  let message = "";
  let isSuccess = false;

  try {
    // Create payment
    const payment = await gateway.transaction.sale({
      amount: totalPrice.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    message = payment.message;
    isSuccess = payment.success;

    console.log("Payment", payment);
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
