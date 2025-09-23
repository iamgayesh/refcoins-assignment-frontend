# Lookup API Service Documentation

This document explains how to use the new lookup API service components that handle common endpoints for types, locations, and statuses.

## Files Created

1. **`src/lib/lookupApiService.ts`** - API service for making HTTP requests
2. **`src/lib/useLookupData.ts`** - React hook for easy component integration
3. **`src/components/ui/LookupDataExample.tsx`** - Example component demonstrating usage
4. **Enhanced `src/redux/slices/lookupSlice.ts`** - Redux state management with async thunks

## API Endpoints

The service handles these endpoints:

- `GET http://localhost:7000/types` - Fetch property types
- `GET http://localhost:7000/locations` - Fetch locations
- `GET http://localhost:7000/statuses` - Fetch statuses

## Usage Examples

### 1. Using the Hook in a Component

```tsx
import React, { useEffect } from "react";
import useLookupData from "../lib/useLookupData";

const MyComponent: React.FC = () => {
  const {
    types,
    locations,
    statuses,
    loading,
    error,
    loadAllLookupData,
    isAllDataLoaded,
  } = useLookupData();

  // Load data when component mounts
  useEffect(() => {
    if (!isAllDataLoaded) {
      loadAllLookupData();
    }
  }, [isAllDataLoaded, loadAllLookupData]);

  if (loading.types || loading.locations || loading.statuses) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Property Types: {types.length}</h2>
      <h2>Locations: {locations.length}</h2>
      <h2>Statuses: {statuses.length}</h2>
    </div>
  );
};
```

### 2. Using Individual API Methods

```tsx
import { LookupApiService } from "../lib/lookupApiService";

// Fetch individual data
const types = await LookupApiService.getTypes();
const locations = await LookupApiService.getLocations();
const statuses = await LookupApiService.getStatuses();

// Fetch all data at once
const allData = await LookupApiService.getAllLookupData();
```

### 3. Using Redux Actions Directly

```tsx
import { useAppDispatch } from "../redux/hooks";
import {
  fetchTypes,
  fetchLocations,
  fetchAllLookupData,
} from "../redux/slices/lookupSlice";

const MyComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLoadTypes = () => {
    dispatch(fetchTypes());
  };

  const handleLoadAll = () => {
    dispatch(fetchAllLookupData());
  };

  // ... rest of component
};
```

## Hook API Reference

### Data Properties

- `types: LookupItem[]` - Array of property types
- `locations: LookupItem[]` - Array of locations
- `statuses: LookupItem[]` - Array of statuses

### Loading States

- `loading: { types: boolean, locations: boolean, statuses: boolean }` - Individual loading states
- `isAnyLoading: boolean` - True if any data is loading

### Error States

- `error: { types: string|null, locations: string|null, statuses: string|null }` - Individual error messages
- `hasAnyError: boolean` - True if any errors exist

### Actions

- `loadTypes()` - Load property types
- `loadLocations()` - Load locations
- `loadStatuses()` - Load statuses
- `loadAllLookupData()` - Load all data simultaneously
- `clearAllErrors()` - Clear all error messages

### Utility Properties

- `isTypesLoaded: boolean` - True if types are loaded
- `isLocationsLoaded: boolean` - True if locations are loaded
- `isStatusesLoaded: boolean` - True if statuses are loaded
- `isAllDataLoaded: boolean` - True if all data is loaded

## Redux State Structure

```typescript
interface LookupState {
  locations: LookupItem[];
  statuses: LookupItem[];
  types: LookupItem[];
  loading: {
    locations: boolean;
    statuses: boolean;
    types: boolean;
  };
  error: {
    locations: string | null;
    statuses: string | null;
    types: string | null;
  };
}
```

## LookupItem Interface

```typescript
interface LookupItem {
  id: number;
  description: string;
}
```

## Features

- ✅ **Automatic Token Management** - Uses auth token from session storage
- ✅ **Redux Integration** - Automatic state management
- ✅ **Loading States** - Track loading for each endpoint
- ✅ **Error Handling** - Proper error catching and state management
- ✅ **TypeScript Support** - Full type safety
- ✅ **React Hook** - Easy component integration
- ✅ **Parallel Loading** - Fetch all data simultaneously
- ✅ **Individual Loading** - Load specific data types as needed

## Error Handling

The service includes comprehensive error handling:

- Network errors are caught and logged
- Error messages are stored in Redux state
- Components can display specific error messages
- Errors can be cleared with `clearAllErrors()`

## Authentication

The API service automatically includes authentication tokens from session storage in the format expected by your backend (`Bearer <token>`).
