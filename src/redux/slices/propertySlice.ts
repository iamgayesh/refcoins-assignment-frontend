import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PropertyApiService, {
  Property,
  PaginationInfo,
} from "../../lib/propertyApiService";

export interface PropertyState {
  properties: Property[];
  paginatedProperties: Property[];
  pagination: PaginationInfo | null;
  loading: boolean;
  paginationLoading: boolean;
  error: string | null;
  selectedProperty: Property | null;
}

const initialState: PropertyState = {
  properties: [],
  paginatedProperties: [],
  pagination: null,
  loading: false,
  paginationLoading: false,
  error: null,
  selectedProperty: null,
};

// Async thunk for fetching all properties
export const fetchAllProperties = createAsyncThunk(
  "property/fetchAllProperties",
  async (_, { rejectWithValue }) => {
    try {
      const properties = await PropertyApiService.getAllProperties();
      return properties;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for fetching single property
export const fetchPropertyById = createAsyncThunk(
  "property/fetchPropertyById",
  async (id: number, { rejectWithValue }) => {
    try {
      const property = await PropertyApiService.getPropertyById(id);
      return property;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for fetching paginated properties
export const fetchPropertiesPaginated = createAsyncThunk(
  "property/fetchPropertiesPaginated",
  async (
    { page, limit }: { page: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const result = await PropertyApiService.getPropertiesPaginated(
        page,
        limit || 3
      );
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all properties cases
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single property cases
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.selectedProperty = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch paginated properties cases
      .addCase(fetchPropertiesPaginated.pending, (state) => {
        state.paginationLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesPaginated.fulfilled, (state, action) => {
        state.paginationLoading = false;
        if (action.payload) {
          state.paginatedProperties = action.payload.data;
          state.pagination = action.payload.pagination;
        }
        state.error = null;
      })
      .addCase(fetchPropertiesPaginated.rejected, (state, action) => {
        state.paginationLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedProperty, clearSelectedProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
