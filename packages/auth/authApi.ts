import { registerAuthEndpoints } from './authRegistry';
import { createAuthSlice } from './createAuthSlice';
import { type UntypedApi } from './authTypes';

let authApi: null | ReturnType<typeof registerAuthEndpoints> = null;
let authSlice: null | ReturnType<typeof createAuthSlice> = null;

export function initializeAuthPackage(api: UntypedApi) {
    if (authApi) {
        throw new Error('Auth package has already been initialized');
    }

    authApi = registerAuthEndpoints(api);
    authSlice = createAuthSlice(authApi);

    return { authSlice, authApi };
}

export function getAuthApi() {
    if (!authApi) {
        throw new Error('Auth package was not initialized');
    }

    return authApi;
}

export function getAuthSlice() {
    if (!authSlice) {
        throw new Error('Auth slice was not initialized');
    }

    return authSlice;
}

export function getAuthApiHooks() {
    const { useUserQuery, useLoginMutation } = getAuthApi();

    return { useUserQuery, useLoginMutation };
}