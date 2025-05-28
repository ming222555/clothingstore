"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchNav() {
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <label className="ms-auto block md:hidden" htmlFor="SearchNav__input">
        <SearchIcon
          role="button"
          onClick={() => {
            setMobile(true);
          }}
        />
      </label>
      <div
        className={`hidden bg-black opacity-25 [&.mobile]:block [&.mobile]:fixed [&.mobile]:top-0 [&.mobile]:left-0 [&.mobile]:bottom-0 [&.mobile]:right-0 md:[&.mobile]:hidden ${
          mobile ? "mobile" : ""
        }`}
        onClick={() => setMobile(false)}
      ></div>
      <Input
        type="text"
        placeholder="Search for products..."
        id="SearchNav__input"
        className={`bg-white ms-auto md:max-w-lg hidden md:block md:static md:z-auto [&.mobile]:block [&.mobile]:absolute [&.mobile]:z-1 md:[&.mobile]:static md:[&.mobile]:z-auto ${
          mobile ? "mobile" : ""
        }`}
      />
      {/* bg-black */}
      <label className="ms-2 hidden md:block" htmlFor="SearchNav__input">
        <SearchIcon role="button" />
      </label>
    </>
  );
}
