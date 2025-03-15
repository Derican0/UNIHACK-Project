import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { loginUser, registerUser, getUserProfile } from '../../services/api';

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);
      // Store token
      await SecureStore.setItemAsync('userToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const data = await registerUser(username, email, password);
      // Store token
      await SecureStore.setItemAsync('userToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await SecureStore.deleteItemAsync('userToken');
  return null;
});

// Load user from storage
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const token = await SecureStore.getItemAsync('userToken');
  
  if (token) {
    const userData = await getUserProfile();
    return { ...userData, token };
  }
  
  return null;
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Load user case
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;