import React, { useEffect } from "react";
import useLookupData from "../../lib/useLookupData";
import { LookupItem } from "../../redux/slices/lookupSlice";

/**
 * Example component showing how to use the lookup data hook
 * This component can be used as a reference or integrated into your existing components
 */
const LookupDataExample: React.FC = () => {
  const {
    types,
    locations,
    statuses,
    loading,
    error,
    isAnyLoading,
    hasAnyError,
    loadAllLookupData,
    loadTypes,
    loadLocations,
    loadStatuses,
    clearAllErrors,
    isAllDataLoaded,
  } = useLookupData();

  // Load all lookup data when component mounts
  useEffect(() => {
    if (!isAllDataLoaded) {
      loadAllLookupData();
    }
  }, [isAllDataLoaded, loadAllLookupData]);

  const handleRefreshAll = () => {
    clearAllErrors();
    loadAllLookupData();
  };

  const handleRefreshTypes = () => {
    clearAllErrors();
    loadTypes();
  };

  const handleRefreshLocations = () => {
    clearAllErrors();
    loadLocations();
  };

  const handleRefreshStatuses = () => {
    clearAllErrors();
    loadStatuses();
  };

  if (isAnyLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading lookup data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Lookup Data Management
        </h2>
        <button
          onClick={handleRefreshAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh All Data
        </button>
      </div>

      {hasAnyError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-semibold">Errors:</h3>
          {error.types && <p>Types: {error.types}</p>}
          {error.locations && <p>Locations: {error.locations}</p>}
          {error.statuses && <p>Statuses: {error.statuses}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Property Types */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              Property Types
            </h3>
            <button
              onClick={handleRefreshTypes}
              disabled={loading.types}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              {loading.types ? "Loading..." : "Refresh"}
            </button>
          </div>
          <div className="space-y-2">
            {types.length > 0 ? (
              types.map((type: LookupItem) => (
                <div key={type.id} className="p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">ID: {type.id}</span>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No types available</p>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Locations</h3>
            <button
              onClick={handleRefreshLocations}
              disabled={loading.locations}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              {loading.locations ? "Loading..." : "Refresh"}
            </button>
          </div>
          <div className="space-y-2">
            {locations.length > 0 ? (
              locations.map((location: LookupItem) => (
                <div key={location.id} className="p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">ID: {location.id}</span>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No locations available</p>
            )}
          </div>
        </div>

        {/* Statuses */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Statuses</h3>
            <button
              onClick={handleRefreshStatuses}
              disabled={loading.statuses}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              {loading.statuses ? "Loading..." : "Refresh"}
            </button>
          </div>
          <div className="space-y-2">
            {statuses.length > 0 ? (
              statuses.map((status: LookupItem) => (
                <div key={status.id} className="p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">ID: {status.id}</span>
                  <p className="text-gray-600">{status.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No statuses available</p>
            )}
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-md font-semibold text-gray-700 mb-2">
          Data Summary
        </h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Types:</span> {types.length} items
          </div>
          <div>
            <span className="font-medium">Locations:</span> {locations.length}{" "}
            items
          </div>
          <div>
            <span className="font-medium">Statuses:</span> {statuses.length}{" "}
            items
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookupDataExample;
