import { useSelector } from 'react-redux';

import { type AuthRootState } from './createAuthSlice';

export function useAuth() {
    const auth = useSelector((state: AuthRootState) => state.auth);

    return auth;
}