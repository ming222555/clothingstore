"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import YnsLink from "@/ui/yns-link";

export default function NavMenuAside() {
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="ms-2 sm:hidden hover:cursor-pointer">
        <MenuIcon
          onClick={() => {
            setMobile(true);
          }}
        />
      </div>
      <div
        className={`NavMenuAside__backdrop ${mobile ? "mobile" : ""}`}
        onClick={() => setMobile(false)}
      ></div>
      <div className={`NavMenuAside__links ${mobile ? "mobile" : ""}`}>
        <YnsLink
          href="/"
          className={`font-medium w-3/4 opacity-75 ${
            pathname === "/" ? "link-is-active" : ""
          }`}
        >
          <Button type="button" variant="outline" size="sm">
            Home
          </Button>
        </YnsLink>
        <YnsLink
          href="/category/apparel"
          className={`btn btn-sm btn-light fw-medium w-75 opacity-75${
            pathname === "/category/apparel" ? " link-is-active" : ""
          }`}
        >
          Apparel
        </YnsLink>
        <YnsLink
          href="/category/shoes"
          className={`btn btn-sm btn-light fw-medium w-75 opacity-75${
            pathname === "/category/shoes" ? " link-is-active" : ""
          }`}
        >
          Shoes
        </YnsLink>
        <YnsLink
          href="/category/accessories"
          className={`btn btn-sm btn-light fw-medium w-75 opacity-75${
            pathname === "/category/accessories" ? " link-is-active" : ""
          }`}
        >
          Accessories
        </YnsLink>
      </div>
    </>
  );
}
