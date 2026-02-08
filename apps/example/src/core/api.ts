import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@packages/auth/baseQueryWithAuth";

import { API_BASE_URL } from "../config";
import { registerAuthEndpoints } from "@packages/auth/authApi";

export const createAppApi = () => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 10000,
  });

  const withBaseQueryWithAuth = baseQueryWithAuth(baseQuery);

  const api = createApi({
    baseQuery: withBaseQueryWithAuth,
    endpoints: (builder) => ({
      test: builder.query<{ test: string }, void>({
        query: () => "/test",
      }),
    }),
  });

  return registerAuthEndpoints(api);
};
