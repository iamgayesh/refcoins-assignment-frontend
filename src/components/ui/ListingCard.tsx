import Image from "next/image";
import React from "react";
import { MapPin, Home, Ruler } from "lucide-react";
import { Property } from "../../lib/propertyApiService";

interface ListingCardProps {
  property: Property;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const imageSrc = property.propertyImagePath || "/images/hero-bg.png";

  // Format price in LKR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format area
  const formatArea = (area: number) => {
    return new Intl.NumberFormat().format(area);
  };

  return (
    <div className="w-full sm:max-w-sm bg-background text-foreground rounded-xl shadow-md hover:shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative">
        <div className="relative w-full h-24 sm:h-32 md:h-40">
          <Image
            src={imageSrc}
            alt={property.propertyTitle}
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        {property.propertyStatus && (
          <span className="absolute top-3 left-3 bg-background text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            {property.propertyStatus.statusDescription}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-1.5">
        <h3 className="text-base sm:text-lg font-extrabold truncate">
          {property.propertyTitle}
        </h3>

        {property.propertyLocation && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="mr-1 text-blue-500" />
            {property.propertyLocation.locationDescription}
          </div>
        )}

        {property.propertyType && (
          <div className="flex items-center text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            <Home size={16} className="mr-1" />
            {property.propertyType.typeDescription}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-lg sm:text-xl font-bold">
            {formatPrice(property.propertyPrice)}
          </p>

          <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Ruler size={16} className="mr-1 text-green-600" />
            {formatArea(property.propertyArea)} sq ft
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
