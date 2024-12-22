"use client";

import { useState, useRef } from "react";
import { SearchIcon } from "lucide-react";

export default function SearchNav() {
  const [mobile, setMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="SearchNav__search-icon ms-auto d-md-none">
        <SearchIcon
          onClick={() => {
            // inputRef.current!.focus(); // this not working. bug?
            setTimeout(() => inputRef.current!.focus(), 0);
            setMobile(true);
          }}
        />
      </div>
      <div
        className={`SearchNav__backdrop${mobile ? " mobile" : ""}`}
        onClick={() => setMobile(false)}
      ></div>
      <input
        type="text"
        placeholder="Search for products..."
        className={`SearchNav__input ms-auto bg-warning${
          mobile ? " mobile" : ""
        }`}
        ref={inputRef}
      />
      {/* 
      <input
        type="text"
        placeholder="Search for products..."
        style={{ fontSize: "0.875rem", padding: "0.2rem" }}
        className="SearchNav__input mobile d-none d-md-block ms-auto bg-warning"
      /> */}
    </>
  );
}
