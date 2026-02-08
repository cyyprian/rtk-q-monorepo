import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '@packages/auth/baseQueryWithAuth';

import { API_BASE_URL } from '../config';

export function createAppApi() {
    const baseQuery = fetchBaseQuery({
        baseUrl: API_BASE_URL,
        timeout: 10000,
    });

    const withBaseQueryWithAuth = baseQueryWithAuth(baseQuery);

    return createApi({
        baseQuery: withBaseQueryWithAuth,
        endpoints: (builder) => ({
            test: builder.query<{ test: string }, void>({
                query: () => "/test",
            }),
        }),
    });
}