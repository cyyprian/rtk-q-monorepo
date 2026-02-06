import type {
    Api,
    EndpointDefinitions,
    ApiModules,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface UserResponse {
    name: string | null;
    email: string | null;
}

export interface LoginResponse {
    accessToken: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

// let authAPI: ReturnType<AnyApi['injectEndpoints']> | null = null;
let authAPI = null;

export const initializeAuth = <
    Definitions extends EndpointDefinitions,
    ReducerPath extends string,
    TagTypes extends string,
    Enhancers extends keyof ApiModules<any, any, any, any>,
>(
    api: Api<
        ReturnType<typeof fetchBaseQuery>,
        Definitions,
        ReducerPath,
        TagTypes,
        Enhancers
    >
) => {
    if (authAPI) {
        throw new Error('Auth API already initialized');
    }

    authAPI = api.injectEndpoints({
        endpoints: (builder) => ({
            user: builder.query<UserResponse, void>({
                query: () => '/auth/me',
            }),
            login: builder.mutation<LoginResponse, LoginRequest>({
                query: (credentials) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body: credentials
                })
            }),
        }),
    });

    return authAPI;
}

export const getAuthAPI = () => {
    if (!authAPI) {
        throw new Error('Auth API not initialized. Call initializeAuth first.');
    }

    return authAPI;
}

export const getUseUserQuery = () => getAuthAPI().useUserQuery;
export const getUseLoginMutation = () => getAuthAPI().useLoginMutation;