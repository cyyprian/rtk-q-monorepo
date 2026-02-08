import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import { createAppApi } from "./api";
import { createAuthSlice, selectAuth } from "@packages/auth/createAuthSlice";

let store: ReturnType<typeof configureStore> | null = null;
let api: ReturnType<typeof createAppApi> | null = null;

export function initializeStore() {
  if (store) {
    throw new Error("Store has already been initialized");
  }

  api = createAppApi();

  if (!api) {
    throw new Error("Api was not initialized");
  }

  const authSlice = createAuthSlice(api);

  const rootReducer = combineSlices(
    { [api.reducerPath]: api.reducer },
    { [authSlice.name]: authSlice.reducer },
  );

  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      if (!api) {
        throw new Error("Api was not initialized");
      }
      return getDefaultMiddleware().concat(api.middleware);
    },
    devTools: true,
  });

  return store;
}

export function getStore(): AppStore {
  if (!store) {
    throw new Error("Store was not initialized");
  }

  return store;
}

export function getApi() {
  if (!api) {
    throw new Error("Api was not initialized");
  }

  return api;
}

export type AppStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppApi = ReturnType<typeof getApi>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export function getApiHooks() {
  const { useUserQuery, useLoginMutation } = getApi();
  return { useUserQuery, useLoginMutation };
}

export { selectAuth };
