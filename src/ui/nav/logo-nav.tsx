"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <Link href="/" className="text-decoration-none">
      {isH1 ? (
        <h1 className="h4"> Your Next Store</h1>
      ) : (
        <span className="h4"> Your Next Store</span>
      )}
    </Link>
  );
}
