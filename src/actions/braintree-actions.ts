"use server";

import { gateway } from "@/config/braintree";

export async function getBraintreeClientToken() {
  try {
    const res = await gateway.clientToken.generate({});
    return { clientToken: res.clientToken, ok: true };
  } catch (err) {
    console.log(err);
    return {
      clientToken: "Error generating braintree client token",
      ok: false,
    };
  }
}

export async function braintreeMakePayment(nonce: string, totalPrice: number) {
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
