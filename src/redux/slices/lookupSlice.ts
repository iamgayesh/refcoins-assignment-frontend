import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import LookupApiService from "../../lib/lookupApiService";

export interface LookupItem {
  id: number;
  description: string;
}

export interface LookupState {
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

const initialState: LookupState = {
  locations: [],
  statuses: [],
  types: [],
  loading: {
    locations: false,
    statuses: false,
    types: false,
  },
  error: {
    locations: null,
    statuses: null,
    types: null,
  },
};

// Async thunks for API calls
export const fetchTypes = createAsyncThunk(
  "lookup/fetchTypes",
  async (_, { rejectWithValue }) => {
    try {
      return await LookupApiService.getTypes();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchLocations = createAsyncThunk(
  "lookup/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      return await LookupApiService.getLocations();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchStatuses = createAsyncThunk(
  "lookup/fetchStatuses",
  async (_, { rejectWithValue }) => {
    try {
      return await LookupApiService.getStatuses();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAllLookupData = createAsyncThunk(
  "lookup/fetchAllLookupData",
  async (_, { rejectWithValue }) => {
    try {
      return await LookupApiService.getAllLookupData();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const lookupSlice = createSlice({
  name: "lookup",
  initialState,
  reducers: {
    setLocations(state, action: PayloadAction<LookupItem[]>) {
      state.locations = action.payload;
    },
    setStatuses(state, action: PayloadAction<LookupItem[]>) {
      state.statuses = action.payload;
    },
    setTypes(state, action: PayloadAction<LookupItem[]>) {
      state.types = action.payload;
    },
    clearLookups(state) {
      state.locations = [];
      state.statuses = [];
      state.types = [];
    },
    clearErrors(state) {
      state.error.locations = null;
      state.error.statuses = null;
      state.error.types = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Types
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading.types = true;
        state.error.types = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading.types = false;
        state.types = action.payload;
        state.error.types = null;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading.types = false;
        state.error.types = action.payload as string;
      });

    // Fetch Locations
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading.locations = true;
        state.error.locations = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading.locations = false;
        state.locations = action.payload;
        state.error.locations = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading.locations = false;
        state.error.locations = action.payload as string;
      });

    // Fetch Statuses
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading.statuses = true;
        state.error.statuses = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.loading.statuses = false;
        state.statuses = action.payload;
        state.error.statuses = null;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading.statuses = false;
        state.error.statuses = action.payload as string;
      });

    // Fetch All Lookup Data
    builder
      .addCase(fetchAllLookupData.pending, (state) => {
        state.loading.types = true;
        state.loading.locations = true;
        state.loading.statuses = true;
        state.error.types = null;
        state.error.locations = null;
        state.error.statuses = null;
      })
      .addCase(fetchAllLookupData.fulfilled, (state, action) => {
        state.loading.types = false;
        state.loading.locations = false;
        state.loading.statuses = false;
        state.types = action.payload.types;
        state.locations = action.payload.locations;
        state.statuses = action.payload.statuses;
        state.error.types = null;
        state.error.locations = null;
        state.error.statuses = null;
      })
      .addCase(fetchAllLookupData.rejected, (state, action) => {
        state.loading.types = false;
        state.loading.locations = false;
        state.loading.statuses = false;
        const errorMessage = action.payload as string;
        state.error.types = errorMessage;
        state.error.locations = errorMessage;
        state.error.statuses = errorMessage;
      });
  },
});

export const {
  setLocations,
  setStatuses,
  setTypes,
  clearLookups,
  clearErrors,
} = lookupSlice.actions;

export default lookupSlice.reducer;
