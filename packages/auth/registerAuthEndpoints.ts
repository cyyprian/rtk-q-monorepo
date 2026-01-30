export interface AuthUser {
    name: string | null
    email: string | null
}

export const registerAuthEndpoints = (api) => {
    return api.injectEndpoints({
        endpoints: (builder) => ({
            user: builder.query<AuthUser, void>({
                query: () => '/auth/me'
            }),
        })
    });
}

// export const { useUserQuery } = registerAuthEndpoints;