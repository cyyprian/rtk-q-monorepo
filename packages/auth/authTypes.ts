import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { registerAuthEndpoints } from './authApi';

// Function used to create a type erased version of API
const createUntypedApi = (options: {
    baseQuery: ReturnType<typeof fetchBaseQuery>;
    endpoints: () => {};
}) => createApi(options);

// Type erased version of Api
export type UntypedApi = ReturnType<typeof createUntypedApi>;

// Type erased version of AuthApi
export type UntypedAuthApi = ReturnType<typeof registerAuthEndpoints>;

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