"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import YnsLink from "@/ui/yns-link";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <YnsLink href="/" className="text-black hidden sm:block me-1">
        <Button
          type="button"
          role="button"
          variant="link"
          size="sm"
          className={`border-0 text-sm font-bold ${
            pathname === "/" ? "bg-gray-200" : ""
          }`}
        >
          Home
        </Button>
      </YnsLink>
      <YnsLink
        href="/category/apparel"
        className="text-black hidden sm:block me-1"
      >
        <Button
          type="button"
          role="button"
          variant="link"
          size="sm"
          className={`border-0 text-sm font-bold ${
            pathname === "/category/apparel" ? "bg-gray-200" : ""
          }`}
        >
          Apparel
        </Button>
      </YnsLink>
      <YnsLink
        href="/category/shoes"
        className="text-black hidden sm:block me-1"
      >
        <Button
          type="button"
          role="button"
          variant="link"
          size="sm"
          className={`border-0 text-sm font-bold ${
            pathname === "/category/shoes" ? "bg-gray-200" : ""
          }`}
        >
          Shoes
        </Button>
      </YnsLink>
      <YnsLink
        href="/category/accessories"
        className="text-black hidden sm:block me-1"
      >
        <Button
          type="button"
          role="button"
          variant="link"
          size="sm"
          className={`border-0 text-sm font-bold ${
            pathname === "/category/accessories" ? "bg-gray-200" : ""
          }`}
        >
          Accessories
        </Button>
      </YnsLink>
    </>
  );
}
