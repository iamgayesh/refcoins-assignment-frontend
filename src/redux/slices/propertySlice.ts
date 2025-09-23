import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PropertyApiService, { Property } from "../../lib/propertyApiService";

export interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
  selectedProperty: Property | null;
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
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
      });
  },
});

export const { clearError, setSelectedProperty, clearSelectedProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
