import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { shoppingCartReducer } from "./shoppingCart/slice";
import { medicinesReducer } from "./medicines/slice";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({
  medicines: medicinesReducer,
  shoppingCart: persistReducer(
    { key: "cart", storage, whitelist: ["cartItems", "totalPrice"] },
    shoppingCartReducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
