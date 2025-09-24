// pages/DashboardPage.tsx
"use client";

import HeroSection from "../../components/ui/HeroSection";
import PaginatedProperties from "../../components/ui/PaginatedProperties";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <HeroSection />

        <section className="mt-10 sm:mt-16">
          <PaginatedProperties
            itemsPerPage={3}
            title="All Properties"
            description="Explore our complete collection of properties with pagination. Browse through properties 3 at a time with images."
          />
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
