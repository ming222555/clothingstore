"use server";

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

export async function braintreeMakePaymentAction(nonce: string) {
  // todo determine totalPrice
  let totalPrice = 0;
  totalPrice = totalPrice + 123456.66;

  if (!nonce || !totalPrice) {
    console.log("Nonce or totalPrice is missing");
    return { message: "Nonce or totalPrice is missing", ok: false };
  }

  try {
    // Create payment
    const payment = await gateway.transaction.sale({
      amount: totalPrice.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    console.log("Payment Payment Payment", payment);

    if (!payment.success) {
      console.log("Payment failed", payment);
      return { message: "Payment failed", ok: false };
    }
    return { message: "Checkout successful", ok: true };
  } catch (err) {
    console.log(err);
    return { message: "Failed to checkout", ok: false };
  }
}
