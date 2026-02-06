import { registerAuthEndpoints, initializeAuthPackage } from "@packages/auth";
import api from "./api";

const authApi = registerAuthEndpoints(api);
initializeAuthPackage(authApi);

export const { useUserQuery, useLoginMutation, useTestQuery } = authApi;

