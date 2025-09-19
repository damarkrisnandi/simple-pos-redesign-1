import { createSlice } from '@reduxjs/toolkit';

const authSlices = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
})

export const { login, logout } = authSlices.actions;
const authReducer = authSlices.reducer;
export default authReducer;
