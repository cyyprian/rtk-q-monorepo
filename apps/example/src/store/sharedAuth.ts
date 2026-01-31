import { registerAuthEndpoints } from "@packages/auth";
import api from "./api";

const authApi = registerAuthEndpoints(api);

export const { useUserQuery, useLoginMutation } = authApi;