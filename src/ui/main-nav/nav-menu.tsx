"use client";

import { usePathname } from "next/navigation";

import YnsLink from "@/ui/yns-link";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <YnsLink
        href="/"
        className={`d-none d-sm-block btn btn-sm btn-light me-1${
          pathname === "/" ? " link-is-active" : ""
        }`}
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Home
      </YnsLink>
      <YnsLink
        href="/category/apparel"
        className={`d-none d-sm-block btn btn-sm btn-light me-1${
          pathname === "/category/apparel" ? " link-is-active" : ""
        }`}
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Apparel
      </YnsLink>
      <YnsLink
        href="/category/accessories"
        className={`d-none d-sm-block btn btn-sm btn-light me-1${
          pathname === "/category/accessories" ? " link-is-active" : ""
        }`}
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Accessories
      </YnsLink>
      <YnsLink
        href="/category/digital"
        className={`d-none d-sm-block btn btn-sm btn-light me-1${
          pathname === "/category/digital" ? " link-is-active" : ""
        }`}
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Digital
      </YnsLink>
    </>
  );
}
