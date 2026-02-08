import api from './api';
import { createAuthSlice, selectAuth } from '@packages/auth/createAuthSlice';
import { initializeAuthPackage, registerAuthEndpoints } from '@packages/auth/authApi';

const authApi = registerAuthEndpoints(api);

initializeAuthPackage(authApi);

export const authSlice = createAuthSlice(authApi);

export const { useUserQuery, useLoginMutation } = authApi;

export { selectAuth };