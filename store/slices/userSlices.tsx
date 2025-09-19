import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userInfo: any | null;
  loading: boolean;
  error: string | null;
};

const userSlices = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add new actions for AsyncStorage operations
    loadUserFromStorage(state) {
      state.loading = true;
      state.error = null;
    },
    loadUserFromStorageSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loadUserFromStorageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loadUserFromStorage,
  loadUserFromStorageSuccess,
  loadUserFromStorageFailure,
  clearUser
} = userSlices.actions;
const userReducer = userSlices.reducer;
export default userReducer;
