"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllLookupData } from "../../redux/slices/lookupSlice";
import { fetchAllProperties } from "../../redux/slices/propertySlice";
import PropertyApiService, {
  CreatePropertyData,
} from "../../lib/propertyApiService";
import CommonButton from "./CommonButton";

interface AddPropertyFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddPropertyForm({
  onClose,
  onSuccess,
}: AddPropertyFormProps) {
  const dispatch = useAppDispatch();
  const { types, locations, statuses } = useAppSelector(
    (state) => state.lookup
  );

  const [formData, setFormData] = useState<CreatePropertyData>({
    propertyTitle: "",
    propertySlug: "",
    propertyLocation: 0,
    propertyDescription: "",
    propertyPrice: 0,
    propertyType: 0,
    propertyStatus: 0,
    propertyArea: 0,
    propertyImagePath: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load lookup data when component mounts
  useEffect(() => {
    if (types.length === 0 || locations.length === 0 || statuses.length === 0) {
      dispatch(fetchAllLookupData());
    }
  }, [dispatch, types.length, locations.length, statuses.length]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.propertyTitle) {
      const slug = formData.propertyTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, propertySlug: slug }));
    }
  }, [formData.propertyTitle]);

  const handleInputChange = (
    field: keyof CreatePropertyData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.propertyTitle.trim()) {
      setError("Property title is required");
      return false;
    }
    if (!formData.propertySlug.trim()) {
      setError("Property slug is required");
      return false;
    }
    if (formData.propertyLocation === 0) {
      setError("Please select a location");
      return false;
    }
    if (formData.propertyType === 0) {
      setError("Please select a property type");
      return false;
    }
    if (formData.propertyStatus === 0) {
      setError("Please select a property status");
      return false;
    }
    if (formData.propertyPrice <= 0) {
      setError("Property price must be greater than 0");
      return false;
    }
    if (formData.propertyArea <= 0) {
      setError("Property area must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const result = await PropertyApiService.createProperty(formData);

      if (result) {
        // Refresh the properties list
        dispatch(fetchAllProperties());

        // Call success callback
        if (onSuccess) onSuccess();

        // Close the modal
        onClose();
      } else {
        setError("Failed to create property. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while creating the property.");
      console.error("Create property error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading form data...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Property Title + Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Property Title *
          </label>
          <input
            type="text"
            value={formData.propertyTitle}
            onChange={(e) => handleInputChange("propertyTitle", e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Property Slug *
          </label>
          <input
            type="text"
            value={formData.propertySlug}
            onChange={(e) => handleInputChange("propertySlug", e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="property-slug"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Location + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Location *
          </label>
          <select
            value={formData.propertyLocation}
            onChange={(e) =>
              handleInputChange("propertyLocation", Number(e.target.value))
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value={0}>Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Property Type *
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) =>
              handleInputChange("propertyType", Number(e.target.value))
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value={0}>Select Type</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Property Status *
          </label>
          <select
            value={formData.propertyStatus}
            onChange={(e) =>
              handleInputChange("propertyStatus", Number(e.target.value))
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value={0}>Select Status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Price (LKR) *
          </label>
          <input
            type="number"
            value={formData.propertyPrice || ""}
            onChange={(e) =>
              handleInputChange("propertyPrice", Number(e.target.value))
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="1"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Area + Image URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Area (sq ft) *
          </label>
          <input
            type="number"
            value={formData.propertyArea || ""}
            onChange={(e) =>
              handleInputChange("propertyArea", Number(e.target.value))
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="1"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={formData.propertyImagePath}
            onChange={(e) =>
              handleInputChange("propertyImagePath", e.target.value)
            }
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
            disabled={loading}
          />
        </div>
      </div>

      {/* Description (full width) */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.propertyDescription}
          onChange={(e) =>
            handleInputChange("propertyDescription", e.target.value)
          }
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter property description"
          rows={3}
          disabled={loading}
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <CommonButton
          type="button"
          label="Cancel"
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        />
        <CommonButton
          type="button"
          label="Reset"
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        />
        <CommonButton
          type="submit"
          label={loading ? "Creating..." : "Create Property"}
          variant="primary"
          disabled={loading}
        />
      </div>
    </form>
  );
}
