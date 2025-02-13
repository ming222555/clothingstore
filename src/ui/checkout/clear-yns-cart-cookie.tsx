"use client";

import { useEffect } from "react";

import { clearYnsCartCookieAction } from "@/actions/cart-actions";

export default function ClearYnsCartCookie() {
  useEffect(() => {
    clearYnsCartCookieAction();
  }, []);

  return null;
}
