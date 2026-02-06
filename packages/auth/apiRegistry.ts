import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerAuthEndpoints } from "./registerAuthEndpoints";

// Function used to create a type erased version of API
const createSomeApi = (options: {
  baseQuery: ReturnType<typeof fetchBaseQuery>;
  endpoints: () => {};
}) => createApi(options);

// Type erased version of API
type SomeApi = ReturnType<typeof createSomeApi>;

const registerSomeAuthEndpoints = (api: SomeApi) => registerAuthEndpoints(api);

// Type erased version of SomeApi
export type SomeApiWithAuth = ReturnType<typeof registerSomeAuthEndpoints>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let api: SomeApiWithAuth | null = null;

export function initializeAuthPackage(realApi: SomeApiWithAuth): void {
  api = realApi;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getApi(): SomeApiWithAuth {
  if (!api) {
    throw new Error(
      "Auth package not initialized. Call initializeAuthPackage(api) before using auth features.",
    );
  }
  return api;
}
