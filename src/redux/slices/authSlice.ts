import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiManager from "../../lib/apiManager";

// API response interfaces
interface LoginResponse {
  responseCode: string;
  responseMsg: string;
  content: {
    access_token: string;
    user: {
      id: string;
      username: string;
      userType: string;
    };
  } | null;
  exception: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: string | null;
    username: string | null;
    userType: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {
    id: null,
    username: null,
    userType: null,
  },
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiManager.apiPost<LoginResponse>(
        "/auth/login",
        credentials
      );

      if (response.responseCode !== "00" || !response.content) {
        return rejectWithValue(response.responseMsg || "Login failed");
      }

      // Store token in sessionStorage
      const authData = {
        token: response.content.access_token,
        user: response.content.user,
      };
      sessionStorage.setItem("authContextData", JSON.stringify(authData));

      return authData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    // Clear sessionStorage
    sessionStorage.removeItem("authContextData");
    // Clear auth state
    dispatch(clearAuth());
    return null;
  }
);

// Async thunk to restore auth from sessionStorage
export const restoreAuth = createAsyncThunk("auth/restoreAuth", async () => {
  const authData = sessionStorage.getItem("authContextData");
  if (authData) {
    const parsed = JSON.parse(authData);
    return {
      token: parsed.token,
      user: parsed.user,
    };
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: string; username: string; userType: string };
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = {
        id: null,
        username: null,
        userType: null,
      };
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.token = null;
        state.user = {
          id: null,
          username: null,
          userType: null,
        };
      })
      // Restore auth cases
      .addCase(restoreAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = {
          id: null,
          username: null,
          userType: null,
        };
        state.error = null;
      });
  },
});

export const { setAuth, clearAuth, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
