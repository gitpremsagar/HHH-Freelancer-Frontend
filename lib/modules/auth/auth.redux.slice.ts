import { authService } from "@/lib/modules/auth/auth.service";
import { User } from "@/lib/modules/auth/auth.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRefreshedAccessToken = createAsyncThunk(
  "auth/getRefreshedAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getRefreshedAccessToken();
      return response;
    } catch (error: unknown) {
      console.error("Get refreshed access token error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);
// Auth State Types
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRefreshedAccessToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getRefreshedAccessToken.fulfilled, (state, action) => {
      state.user = action.payload.data.user as User;
      state.accessToken = action.payload.data.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getRefreshedAccessToken.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
