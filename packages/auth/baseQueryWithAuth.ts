import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import {
    type AuthRootState,
    selectAccessToken,
    invalidateAuth
} from './authSlice';

export const baseQueryWithAuth = (
    baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
    async (args, api, extraOptions) => {
        let modifiedArgs = args;

        const accessToken = selectAccessToken(api.getState() as AuthRootState);

        if(accessToken) {
            if (typeof args === 'string') {
                modifiedArgs = { url: args };
            } else {
                modifiedArgs = { ...args };
            }

            modifiedArgs.headers = {
                ...(modifiedArgs.headers || {}),
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            };
        }

        const result = await baseQuery(modifiedArgs, api, extraOptions);

        if (accessToken && result.error && result.error.status === 401) {
            api.dispatch(invalidateAuth());
        }

        return result;
    };