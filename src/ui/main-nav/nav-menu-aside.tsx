"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import YnsLink from "@/ui/yns-link";

export default function NavMenuAside() {
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="ms-2 d-sm-none hover-cursor-pointer">
        <MenuIcon
          onClick={() => {
            setMobile(true);
          }}
        />
      </div>
      <div
        className={`NavMenuAside__backdrop${mobile ? " mobile" : ""}`}
        onClick={() => setMobile(false)}
      ></div>
      <div
        className={`NavMenuAside__links bg-warning${mobile ? " mobile" : ""}`}
      >
        <YnsLink
          href="/"
          className={`btn btn-sm btn-light w-75${
            pathname === "/" ? " link-is-active" : ""
          }`}
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Home
        </YnsLink>
        <YnsLink
          href="/category/apparel"
          className={`btn btn-sm btn-light w-75${
            pathname === "/category/apparel" ? " link-is-active" : ""
          }`}
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Apparel
        </YnsLink>
        <YnsLink
          href="/category/accessories"
          className={`btn btn-sm btn-light w-75${
            pathname === "/category/accessories" ? " link-is-active" : ""
          }`}
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Accessories
        </YnsLink>
        <YnsLink
          href="/category/digital"
          className={`btn btn-sm btn-light w-75${
            pathname === "/category/digital" ? " link-is-active" : ""
          }`}
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Digital
        </YnsLink>
      </div>
    </>
  );
}
