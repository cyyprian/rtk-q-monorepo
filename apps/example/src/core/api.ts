import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from '@packages/auth'

import { API_BASE_URL } from '../config'

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 10000
});

const withBaseQueryWithAuth = baseQueryWithAuth(baseQuery);

export default createApi({
    baseQuery: withBaseQueryWithAuth,
    endpoints: () => ({}),
})