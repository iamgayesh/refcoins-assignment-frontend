// pages/DashboardPage.tsx
"use client";

import HeroSection from "../../components/ui/HeroSection";
import ListingCard from "../../components/ui/ListingCard";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchAllProperties } from "../../redux/slices/propertySlice";
import React, { useEffect } from "react";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { properties, loading, error } = useAppSelector(
    (state) => state.property
  );

  // Fetch properties when component mounts
  useEffect(() => {
    dispatch(fetchAllProperties());
  }, [dispatch]);

  const renderPropertySection = () => {
    if (loading) {
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
            onClick={() => dispatch(fetchAllProperties())}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (properties.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Properties will appear here once they are added to the system.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {properties.map((property) => (
          <ListingCard key={property.propertyId} property={property} />
        ))}
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <div>
        <HeroSection />

        <section className="max-w-6xl mx-auto mt-10 sm:mt-16 px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Property Listings
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Explore our curated list of properties available for sale and
                rent.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {!loading && !error && (
                <span>{properties.length} properties found</span>
              )}
            </div>
          </div>

          {renderPropertySection()}
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
