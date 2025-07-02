import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
