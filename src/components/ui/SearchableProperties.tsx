"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import PaginatedProperties from "./PaginatedProperties";

interface SearchFilters {
  locationId?: number;
  statusId?: number;
  typeId?: number;
}

interface SearchablePropertiesProps {
  showSearch?: boolean;
  itemsPerPage?: number;
  title?: string;
  description?: string;
}

const SearchableProperties: React.FC<SearchablePropertiesProps> = ({
  showSearch = true,
  itemsPerPage = 3,
  title = "Properties",
  description = "Browse through our property listings",
}) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchStart = () => {
    // This will be called when search is initiated
    setIsSearchMode(true);
  };

  const handleReset = () => {
    setSearchFilters({});
    setIsSearchMode(false);
  };

  return (
    <div className="w-full">
      {showSearch && (
        <div className="mb-8">
          <SearchBar onSearchStart={handleSearchStart} />
        </div>
      )}
      <PaginatedProperties
        itemsPerPage={itemsPerPage}
        title={title}
        description={description}
        searchFilters={searchFilters}
        isSearchMode={isSearchMode}
      />
    </div>
  );
};

export default SearchableProperties;
