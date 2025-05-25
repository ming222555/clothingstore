"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import YnsLink from "@/ui/yns-link";

export default function LogoNav() {
  const pathname = usePathname();
  const [isH1, setIsH1] = useState(true);

  useEffect(() => {
    if (pathname === "/") {
      setIsH1(true);
      return;
    }
    if (pathname.startsWith("/products")) {
      setIsH1(false);
      return;
    }
    if (pathname.startsWith("/product")) {
      setIsH1(false);
      return;
    }
    if (pathname.startsWith("/category")) {
      setIsH1(false);
      return;
    }
    setIsH1(true);
  }, [pathname]);

  return (
    <YnsLink href="/" className="text-decoration-none shrink-0 me-2">
      {isH1 ? (
        <h1 className="h5 inline font-bold text-gray-500">Your Nextjs Store</h1>
      ) : (
        <span className="h5 font-bold text-gray-500">Your Nextjs Store</span>
      )}
    </YnsLink>
  );
}
