import { createSlice, createAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import type { UntypedAuthApi } from "./authTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerAuthEndpoints } from "./authRegistry";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInvalid: boolean;
}

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  isInvalid: false,
} as AuthState;

export const invalidateAuth = createAction("auth/invalidateAuth");
export const updateUserActivity = createAction("auth/updateUserActivity");

export function createAuthSlice(api: UntypedAuthApi) {
  return createSlice({
    name: "auth",
    initialState,
    reducers: {
      /* */
    },
    extraReducers: (builder) => {
      builder
        .addCase(invalidateAuth.type, (state, action) => {
          state.isInvalid = true;
        })
        .addMatcher(api.endpoints.user.matchPending, (state, action) => {
          console.log("api.endpoints.user.matchPending", action);
        })
        .addMatcher(api.endpoints.user.matchRejected, (state, action) => {
          console.log("api.endpoints.user.matchRejected", action);
        })
        .addMatcher(api.endpoints.user.matchFulfilled, (state, action) => {
          console.log("api.endpoints.user.matchFulfilled", action);
        })
        .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.isInvalid = false;
          state.accessToken = action.payload.accessToken;
        });
    },
  });
}

// This interface defines the shape of the root state specifically for
// the part of the Redux store that contains authentication state.
// It expects the root state object to have a property called "auth",
// which will hold the authentication information described by AuthState.
export interface AuthRootState {
  auth: AuthState;
}

export const selectAuth = (state: AuthRootState) => state.auth;
export const selectAccessToken = (state: AuthRootState) =>
  state.auth.accessToken;

// This function would configure a "local" store if called, but currently it is
// not called, and is just used for type inference.
const configureLocalStore = () =>
  configureStore({
    reducer: {
      auth: createAuthSlice(
        registerAuthEndpoints(
          createApi({
            baseQuery: fetchBaseQuery(),
            endpoints: () => {
              return {};
            },
          }),
        ),
      ).reducer,
    },
  });

// Infer the type of the dispatch that would be needed for a store that consisted of
// just this slice
type SliceDispatch = ReturnType<typeof configureLocalStore>["dispatch"];

export let useSliceDispatch = () => useDispatch<SliceDispatch>();

