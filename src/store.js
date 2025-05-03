import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import appAPI from "./services/appAPI";

const rootReducer = combineReducers({
  user: userReducer,
  [appAPI.reducerPath]: appAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [appAPI.reducerPath], // don’t persist the RTK Query cache
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }) // needed for redux-persist
      .concat(appAPI.middleware),
});
