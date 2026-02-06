import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    accessToken: string | null
    isAuthenticated: boolean
    isInvalid: boolean
}

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    isInvalid: false
} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: { payload: string }) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
            state.isInvalid = false;
        },
        invalidateAuth: (state) => {
            state.isInvalid = true;
        },
    },
    extraReducers: (builder) => {
        // TODO: update the state by action authApi.endpoints.login.matchFulfilled
    }
})

export const { setAccessToken, invalidateAuth } = authSlice.actions;
export { authSlice };

// This interface defines the shape of the root state specifically for
// the part of the Redux store that contains authentication state.
// It expects the root state object to have a property called "auth",
// which will hold the authentication information described by AuthState.
export interface AuthRootState {
    auth: AuthState
}

export const selectAuth = (state: AuthRootState) => state.auth
export const selectAccessToken = (state: AuthRootState) => state.auth.accessToken