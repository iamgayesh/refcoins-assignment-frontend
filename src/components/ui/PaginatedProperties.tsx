"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPropertiesPaginated } from "../../redux/slices/propertySlice";
import ListingCard from "./ListingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedPropertiesProps {
  itemsPerPage?: number;
  title?: string;
  description?: string;
}

const PaginatedProperties: React.FC<PaginatedPropertiesProps> = ({
  itemsPerPage = 3,
  title = "Properties",
  description = "Browse through our property listings",
}) => {
  const dispatch = useAppDispatch();
  const { paginatedProperties, pagination, paginationLoading, error } =
    useAppSelector((state) => state.property);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paginated properties when component mounts
  useEffect(() => {
    dispatch(
      fetchPropertiesPaginated({ page: currentPage, limit: itemsPerPage })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationControls = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pagination.totalPages, currentPage + 2);

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!pagination.hasPreviousPage}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border ${
            i === currentPage
              ? "text-blue-600 bg-blue-50 border-blue-300"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    );

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex">{pages}</div>
        <div className="text-sm text-gray-600">
          Showing page {pagination.currentPage} of {pagination.totalPages} (
          {pagination.totalItems} total properties)
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (paginationLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
          <p className="font-semibold">Error loading properties:</p>
          <p>{error}</p>
          <button
            onClick={() =>
              dispatch(
                fetchPropertiesPaginated({
                  page: currentPage,
                  limit: itemsPerPage,
                })
              )
            }
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (paginatedProperties.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Check back later for new property listings.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedProperties.map((property) => (
            <ListingCard key={property.propertyId} property={property} />
          ))}
        </div>

        <div className="mt-8">{renderPaginationControls()}</div>
      </>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {renderContent()}
    </section>
  );
};

export default PaginatedProperties;
