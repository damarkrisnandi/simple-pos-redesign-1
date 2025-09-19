import { createSlice } from '@reduxjs/toolkit';

type OrderState = {
  orders: any[];
  loading: boolean;
  error: string | null;
}

interface Action<T> {
  type: string;
  payload?: T;
}

const orderSlices = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrdersStart(state: OrderState) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state: OrderState, action: Action<any[]>) {
      state.loading = false;
      state.orders = action.payload || [];
    },
    fetchOrdersFailure(state: OrderState, action: Action<string | null>) {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch orders';
    },
  },
})

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlices.actions;
const orderReducer = orderSlices.reducer;
export default orderReducer;
