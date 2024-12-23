"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";

export default function SearchNav() {
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <label
        className="ms-auto d-md-none hover-cursor-pointer"
        htmlFor="SearchNav__input"
      >
        <SearchIcon
          onClick={() => {
            setMobile(true);
          }}
        />
      </label>
      <div
        className={`SearchNav__backdrop${mobile ? " mobile" : ""}`}
        onClick={() => setMobile(false)}
      ></div>
      {/* <input
        type="text"
        placeholder="Search for products..."
        className={`SearchNav__input ms-auto bg-warning form-control${
          mobile ? " mobile" : ""
        }`}
        ref={inputRef}
      /> */}
      <div
        className={`SearchNav__input-group ms-auto input-group input-group-sm bg-warning${
          mobile ? " mobile" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="form-control"
          id="SearchNav__input"
        />
        <label
          className="input-group-text d-none d-md-block hover-cursor-pointer"
          htmlFor="SearchNav__input"
        >
          <SearchIcon />
        </label>
      </div>
      {/* <input
        type="text"
        placeholder="Search for products..."
        className={`SearchNav__input ms-auto bg-warning form-control${
          mobile ? " mobile" : ""
        }`}
        ref={inputRef}
      /> */}
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
