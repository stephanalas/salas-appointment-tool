import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootSlice";
import {
  FLUSH,
  PAUSE,
  REGISTER,
  REHYDRATE,
  PERSIST,
  PURGE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./api";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
