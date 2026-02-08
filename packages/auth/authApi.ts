import type {
    UntypedApi,
    UntypedAuthApi,
    UserResponse,
    LoginResponse,
    LoginRequest
} from './authTypes';

// TODO: Properly type the Api

export const registerAuthEndpoints = (api: UntypedApi) => {
    return api.injectEndpoints({
        endpoints: (builder) => ({
            user: builder.query<UserResponse, void>({
                query: () => '/auth/me',
            }),
            login: builder.mutation<LoginResponse, LoginRequest>({
                query: (credentials) => ({
                    url: "/auth/login",
                    method: "POST",
                    body: credentials,
                }),
            }),
        }),
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let authApi: UntypedAuthApi | null = null;

export function initializeAuthPackage(api: UntypedAuthApi): void {
    authApi = api;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAuthApi(): UntypedAuthApi {
    if (!authApi) {
      throw new Error(
        "Auth package not initialized. Call initializeAuthPackage(api) before using auth features.",
      );
    }

    return authApi;
}  