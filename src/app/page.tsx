"use client";

import ListingCard from "@/components/ui/ListingCard";
import HeroSection from "../components/ui/HeroSection";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllProperties } from "../redux/slices/propertySlice";
import React, { useEffect } from "react";

const HomePage: React.FC = () => {
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
          <p className="text-gray-600 text-lg">
            No properties available at the moment.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check back later for new property listings.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {properties.slice(0, 6).map((property) => (
          <ListingCard key={property.propertyId} property={property} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <HeroSection />

      <section className="max-w-6xl mx-auto mt-10 sm:mt-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover our premium collection of properties. From modern
            apartments to luxury houses, find your perfect home with us.
          </p>
        </div>

        {renderPropertySection()}

        {properties.length > 6 && (
          <div className="text-center mt-8">
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Properties ({properties.length})
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
