"use client";

import { toast } from "sonner";

export default function ToastClient({ msg }: { msg: string }) {
  if (msg) {
    toast(msg);
  }

  return null;
}
