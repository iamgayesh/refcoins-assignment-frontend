"use client";

import HeroSection from "../components/ui/HeroSection";
import PaginatedProperties from "../components/ui/PaginatedProperties";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />

      <section className="mt-10 sm:mt-16">
        <PaginatedProperties
          itemsPerPage={3}
          title="All Properties"
          description="Explore our complete collection of properties with search and pagination. Browse through properties 3 at a time with images."
        />
      </section>
    </div>
  );
};

export default HomePage;
