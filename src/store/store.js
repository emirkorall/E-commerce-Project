import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
