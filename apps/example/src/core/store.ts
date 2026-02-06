import { combineSlices, configureStore } from '@reduxjs/toolkit';

import api from "./api";
import { initializeAuth, authSlice } from '@packages/auth';

let store: ReturnType<typeof configureStore> | null = null;

export const initializeStore = () => {
    if(store) {
        throw new Error('Store has already been initialized');
    }

    initializeAuth(api);

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

export const getStore = () => {
    if(!store) {
        throw new Error('Store was not initialized');
    }

    return store;
}

// https://redux-toolkit.js.org/usage/nextjs#creating-a-redux-store-per-request

// export const rootReducer = combineSlices(
//     api,
//     auth
// )

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(api.middleware),
//     devTools: true,
// });

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()