import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin } from '../../services/Admin/api';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'adminAuth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await adminLogin(username, password);
      // Save token in cookie with expiration time (1 hour in this example)
      Cookies.set('adminToken', response.token, { expires: 1 / 24 });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkTokenExpiry = () => (dispatch, getState) => {
  const token = getState().adminAuth.token;
  const tokenExpiry = Cookies.get('adminToken');

  if (!token || !tokenExpiry) {
    dispatch(logout());
    return;
  }

  const expiryTime = new Date(tokenExpiry).getTime();
  const currentTime = new Date().getTime();

  if (expiryTime < currentTime) {
    dispatch(logout());
  }
};

export const logout = createAsyncThunk(
  'adminAuth/logout',
  async () => {
    // Perform logout logic here if needed
    Cookies.remove('adminToken');
    return true;
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    token: Cookies.get('adminToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('token', action.payload); // Store token in cookie
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
      Cookies.set('admin', JSON.stringify(action.payload)); // Store admin in cookie
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      Cookies.remove('token'); // Remove token from cookie
      Cookies.remove('admin'); // Remove admin from cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default adminAuthSlice.reducer;
