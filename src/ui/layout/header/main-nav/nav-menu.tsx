"use client";

import { usePathname } from "next/navigation";

import YnsLink from "@/ui/yns-link";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <YnsLink
        href="/"
        className={`d-none d-sm-block btn btn-sm btn-light fw-medium me-1${
          pathname === "/" ? " link-is-active" : ""
        }`}
      >
        Home
      </YnsLink>
      <YnsLink
        href="/category/apparel"
        className={`d-none d-sm-block btn btn-sm btn-light fw-medium me-1${
          pathname === "/category/apparel" ? " link-is-active" : ""
        }`}
      >
        Apparel
      </YnsLink>
      <YnsLink
        href="/category/shoes"
        className={`d-none d-sm-block btn btn-sm btn-light fw-medium me-1${
          pathname === "/category/shoes" ? " link-is-active" : ""
        }`}
      >
        Shoes
      </YnsLink>
      <YnsLink
        href="/category/accessories"
        className={`d-none d-sm-block btn btn-sm btn-light fw-medium me-1${
          pathname === "/category/accessories" ? " link-is-active" : ""
        }`}
      >
        Accessories
      </YnsLink>
    </>
  );
}
