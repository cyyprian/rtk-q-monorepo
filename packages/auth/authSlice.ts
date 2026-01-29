import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean
}

const initialState = {
    isAuthenticated: false
} as AuthState

const sliceName = 'auth';

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
})

export { slice };

// This interface defines the shape of the root state specifically for
// the part of the Redux store that contains authentication state.
// It expects the root state object to have a property called "auth",
// which will hold the authentication information described by AuthState.
interface AuthRootState {
    auth: AuthState
}

export const selectAuth = (state: AuthRootState) => state.auth