"use client";

import { SearchIcon } from "lucide-react";

export default function SearchIconNav() {
  return (
    <>
      <div className="ms-auto d-md-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search for products..."
        style={{ fontSize: "0.875rem", padding: "0.2rem" }}
        className="position-absolute top-0 start-0, end-0 bottom-0"
      />
    </>
  );
}
