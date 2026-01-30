import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
// https://dummyjson.com/docs/auth
export default createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: () => ({}),
})