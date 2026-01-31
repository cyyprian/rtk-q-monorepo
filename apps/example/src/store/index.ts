import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'

import api from "./api";
import { slice as auth } from "@packages/auth";

export const rootReducer = combineSlices(
    api,
    auth
)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()