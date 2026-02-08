import { createSlice, createAction } from "@reduxjs/toolkit";

import type { UntypedAuthApi } from "./authTypes";

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

export function createAuthSlice(api: UntypedAuthApi) {
  return createSlice({
    name: "auth",
    initialState,
    reducers: {
      /* */
    },
    extraReducers: (builder) => {
      builder
        .addCase(invalidateAuth.type, (state, _) => {
          state.isInvalid = true;
        })
        .addMatcher(api.endpoints.user.matchPending, (_, action) => {
          console.log("api.endpoints.user.matchPending", action);
        })
        .addMatcher(api.endpoints.user.matchRejected, (_, action) => {
          console.log("api.endpoints.user.matchRejected", action);
        })
        .addMatcher(api.endpoints.user.matchFulfilled, (_, action) => {
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

