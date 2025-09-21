"use client";

import { useState } from "react";
import CommonButton from "./CommonButton";

export default function SearchBar() {
  const [filters, setFilters] = useState({
    location: "",
    status: "",
    type: "",
  });

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-wrap gap-4 items-center max-w-5xl mx-auto -mt-12 relative z-10">
      {/* Location */}
      <select
        className="p-2 border rounded-lg flex-1"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      >
        <option value="">Select Location</option>
        <option value="newyork">New York</option>
        <option value="chicago">Chicago</option>
        <option value="la">Los Angeles</option>
      </select>

      {/* Status */}
      <select
        className="p-2 border rounded-lg flex-1"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">Select Status</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>

      {/* Type */}
      <select
        className="p-2 border rounded-lg flex-1"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
      </select>

      {/* Search Button */}
      <CommonButton
        label="Search"
        variant="primary"
        onClick={() => alert(JSON.stringify(filters))}
      />
    </div>
  );
}
