import { registerAuthEndpoints } from "@packages/auth/authRegistry";
import { createAuthSlice, selectAuth } from "@packages/auth/createAuthSlice";
import { type ApiType } from "./coreTypes";

let authApi: null | ReturnType<typeof registerAuthEndpoints> = null;
let authSlice: null | ReturnType<typeof createAuthSlice> = null;

export function initializeAuth(api: ApiType) {
    authApi = registerAuthEndpoints(api);
    authSlice = createAuthSlice(authApi);

    return { authSlice, authApi };
}

export function getAuthApi() {
    if (!authApi) {
        throw new Error('Auth API was not initialized');
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

export { selectAuth };