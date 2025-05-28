"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import NavMenu from "./nav-menu";

export default function NavMenuAside() {
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <div className="ms-2 sm:hidden">
        <MenuIcon
          role="button"
          onClick={() => {
            setMobile(true);
          }}
        />
      </div>
      <div
        className={`hidden bg-black opacity-25 [&.mobile]:block [&.mobile]:fixed [&.mobile]:top-0 [&.mobile]:left-0 [&.mobile]:bottom-0 [&.mobile]:right-0 sm:[&.mobile]:hidden ${
          mobile ? "mobile" : ""
        }`}
        onClick={() => setMobile(false)}
      ></div>
      <div
        className={`hidden p-[2rem] bg-white [&.mobile]:flex [&.mobile]:flex-col [&.mobile]:items-center [&.mobile]:justify-center [&.mobile]:gap-[0.5rem] [&.mobile]:fixed [&.mobile]:top-1/2 [&.mobile]:left-0 [&.mobile]:bottom-0 [&.mobile]:right-0 [&.mobile]:z-1 [&.mobile]:animate-slideup2reveal sm:[&.mobile]:hidden ${
          mobile ? "mobile" : ""
        }`}
      >
        <NavMenu />
      </div>
    </>
  );
}
