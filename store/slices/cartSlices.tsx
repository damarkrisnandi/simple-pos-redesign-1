import { CartItem } from "@/models/product";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as CartItem[],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addItemToCart(state, action) {
      const item: CartItem = action.payload;
      const foundItems = state.items.filter(i => i.productId === item.productId);
      if (foundItems.length > 0) {
        // If item already exists, increase quantity
        foundItems[0].quantity += item.quantity;
        
      } else {
        state.items = [...state.items, item];
        
      }
      state.totalAmount += item.price * item.quantity;
      console.log('Adding item to cart:', action.payload, '\n updateditems:', state.items);
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(item => item.productId === itemId);
      if (itemIndex >= 0) {
        const item: CartItem = state.items[itemIndex];
        state.totalAmount -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    fetchCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
