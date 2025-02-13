"use client";

import { useEffect } from "react";

import { clearYnsCartCookieAction } from "@/actions/cart-actions";
import { ttt } from "@/actions/braintree-actions";

export default function ClearYnsCartCookie() {
  useEffect(() => {
    ttt();
    clearYnsCartCookieAction();
  }, []);

  return null;
}
