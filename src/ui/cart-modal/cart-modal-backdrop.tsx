"use client";

import { useRouter } from "next/navigation";

export default function CartModalBackdrop() {
  const router = useRouter();

  return (
    <div
      className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark opacity-50"
      onClick={() => router.back()}
    ></div>
  );
}
