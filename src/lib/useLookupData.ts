import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchTypes,
  fetchLocations,
  fetchStatuses,
  fetchAllLookupData,
  clearErrors,
} from "../redux/slices/lookupSlice";
import { useCallback } from "react";

/**
 * Custom hook for managing lookup data (types, locations, statuses)
 * Provides methods to fetch data and access current state
 */
export const useLookupData = () => {
  const dispatch = useAppDispatch();

  // Selectors for accessing state
  const { locations, statuses, types, loading, error } = useAppSelector(
    (state) => state.lookup
  );

  // Action creators
  const loadTypes = useCallback(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const loadLocations = useCallback(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const loadStatuses = useCallback(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  const loadAllLookupData = useCallback(() => {
    dispatch(fetchAllLookupData());
  }, [dispatch]);

  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Computed values
  const isAnyLoading = loading.types || loading.locations || loading.statuses;
  const hasAnyError = error.types || error.locations || error.statuses;

  return {
    // Data
    types,
    locations,
    statuses,

    // Loading states
    loading,
    isAnyLoading,

    // Error states
    error,
    hasAnyError,

    // Actions
    loadTypes,
    loadLocations,
    loadStatuses,
    loadAllLookupData,
    clearAllErrors,

    // Utility functions
    isTypesLoaded: types.length > 0,
    isLocationsLoaded: locations.length > 0,
    isStatusesLoaded: statuses.length > 0,
    isAllDataLoaded:
      types.length > 0 && locations.length > 0 && statuses.length > 0,
  };
};

export default useLookupData;
