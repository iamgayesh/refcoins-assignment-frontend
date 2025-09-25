import ImageLayer from "./ImageLayer";
import SearchBar from "./SearchBar";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <ImageLayer />
      <div className="absolute left-1/2 top-3/4 transform -translate-x-1/2 w-3/4">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
