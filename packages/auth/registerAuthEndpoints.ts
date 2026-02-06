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

export const registerAuthEndpoints = <
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
  >,
) => {
  return api.injectEndpoints({
    endpoints: (builder) => ({
      user: builder.query<UserResponse, void>({
        query: () => "/auth/me",
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
