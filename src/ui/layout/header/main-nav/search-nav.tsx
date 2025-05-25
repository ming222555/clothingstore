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
        className={`SearchNav__backdrop ${mobile ? "mobile" : ""}`}
        onClick={() => setMobile(false)}
      ></div>
      <Input
        type="text"
        placeholder="Search for products..."
        id="SearchNav__input"
        className={`SearchNav__input bg-white ms-auto md:max-w-lg ${
          mobile ? "mobile" : ""
        }`}
      />
      <label
        className="bg-black ms-2 hidden md:block"
        htmlFor="SearchNav__input"
      >
        <SearchIcon role="button" />
      </label>
    </>
  );
}
