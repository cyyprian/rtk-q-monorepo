import { registerAuthEndpoints } from "@packages/auth";
import api from "./api";

console.log('api', api);

const authApi = registerAuthEndpoints(api);

console.log('authApi', authApi);

console.log('is \'authApi\' instance of \'api\'', authApi === api);

export const { useUserQuery, useLoginMutation } = authApi;