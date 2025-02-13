"use server";

import fs from "fs";
import { redirect } from "next/navigation";
import { gateway } from "@/config/braintree";
import { getCodeList } from "country-list";

import { getCartFromCookiesAction } from "@/actions/cart-actions";
import * as Commerce from "@/lib/commerce-kit";
import { db } from "@/lib/db";

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

  const { error } = await Commerce.insertPayment({
    total,
    nonce,
    cartId: cart.id,
  });

  if (!error) {
    redirect("/checkout-success?cust_email=" + encodeURIComponent(custEmail));
  }

  console.log("INSERT payment record failed", error);
  redirect(
    "/checkout-success?cust_email=" +
      encodeURIComponent(custEmail) +
      "&dberror=" +
      encodeURIComponent("INSERT payment record failed")
  );
}

export const ttt = async () => {
  const stmt = db.prepare(`
    SELECT name, code 
    FROM clist
    ORDER BY name ASC`);

  const resultset = stmt.all();

  fs.writeFile(
    "/home/ming/clisting.txt",
    JSON.stringify(resultset),
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written file has the following contents:");
        console.log(fs.readFileSync("movies.txt", "utf8"));
      }
    }
  );
  // const countrylist = getCodeList();
  // console.log(countrylist);
  // const codes: string[] = [];
  // const names: string[] = [];
  // Object.entries(countrylist).map((keyVal) => {
  //   codes.push(keyVal[0]);
  //   names.push(keyVal[1]);
  // });
  //
  // for (let index = 0; index < codes.length; index++) {
  //   const code = codes[index];
  //   const name = names[index];
  //
  //   const stmt = db.prepare(`
  //     INSERT INTO clist (name, code)
  //     VALUES (?, ?)`);
  //   stmt.run(name, code);
  // }
};
