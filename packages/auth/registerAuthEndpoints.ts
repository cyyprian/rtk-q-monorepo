import type {
    Api,
    EndpointDefinitions,
    ApiModules,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface AuthUser {
    name: string | null;
    email: string | null;
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
            user: builder.query<AuthUser, void>({
                query: () => "/auth/me",
            }),
        }),
    });
};