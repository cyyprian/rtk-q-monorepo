import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import api from './api';
import { authSlice } from './sharedAuth';

let store: ReturnType<typeof configureStore> | null = null;

export function initializeStore() {
    if(store) {
        throw new Error('Store has already been initialized');
    }

    const rootReducer = combineSlices(
        { [api.reducerPath]: api.reducer },
        { [authSlice.name]: authSlice.reducer },
    );

    store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        devTools: true,
    });

    return store;
}

export function getStore(): ReturnType<typeof initializeStore> {
    if(!store) {
        throw new Error('Store was not initialized');
    }

    return store;
}

export type AppStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();