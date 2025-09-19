import { combineReducers } from 'redux';
import authReducer from './slices/authSlices';
import cartReducer from './slices/cartSlices';
import orderReducer from './slices/orderSlices';
import userReducer from './slices/userSlices';

export const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  user: userReducer,
  cart: cartReducer,
})
