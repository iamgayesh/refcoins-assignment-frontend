"use client";

import { useState, useEffect } from "react";
import CommonButton from "./CommonButton";
import useLookupData from "../../lib/useLookupData";

export default function SearchBar() {
  const [filters, setFilters] = useState({
    location: "",
    status: "",
    type: "",
  });

  // Use the lookup data hook
  const {
    types,
    locations,
    statuses,
    loading,
    error,
    loadAllLookupData,
    isAllDataLoaded,
  } = useLookupData();

  // Load lookup data when component mounts
  useEffect(() => {
    if (!isAllDataLoaded) {
      loadAllLookupData();
    }
  }, [isAllDataLoaded, loadAllLookupData]);

  // Handle search functionality
  const handleSearch = () => {
    const searchParams = {
      locationId: filters.location,
      statusId: filters.status,
      typeId: filters.type,
    };

    // You can customize this to call your actual search API
    console.log("Search filters:", searchParams);
    alert(JSON.stringify(searchParams, null, 2));
  };

  // Handle reset functionality
  const handleReset = () => {
    setFilters({ location: "", status: "", type: "" });
  };

  return (
    <div className="bg-background text-foreground shadow-lg rounded-xl p-3 sm:p-4 flex flex-wrap gap-3 sm:gap-4 items-center max-w-5xl mx-auto -mt-12 relative z-10">
      {/* Error Display */}
      {(error.locations || error.statuses || error.types) && (
        <div className="w-full text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-lg flex justify-between items-center">
          <span>Failed to load some dropdown data.</span>
          <button
            onClick={loadAllLookupData}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retry
          </button>
        </div>
      )}
      {/* Location */}
      <select
        className="p-2 border border-gray-300 dark:border-gray-600 bg-background text-foreground rounded-lg w-full sm:flex-1"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        disabled={loading.locations}
      >
        <option value="">
          {loading.locations ? "Loading locations..." : "Select Location"}
        </option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.description}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        className="p-2 border border-gray-300 dark:border-gray-600 bg-background text-foreground rounded-lg w-full sm:flex-1"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        disabled={loading.statuses}
      >
        <option value="">
          {loading.statuses ? "Loading statuses..." : "Select Status"}
        </option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.description}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        className="p-2 border border-gray-300 dark:border-gray-600 bg-background text-foreground rounded-lg w-full sm:flex-1"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        disabled={loading.types}
      >
        <option value="">
          {loading.types ? "Loading types..." : "Select Type"}
        </option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.description}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <CommonButton label="Search" variant="primary" onClick={handleSearch} />
      <CommonButton label="Reset" variant="secondary" onClick={handleReset} />
    </div>
  );
}
