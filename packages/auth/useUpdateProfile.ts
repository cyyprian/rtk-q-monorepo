import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateUserActivity } from './createAuthSlice';

export default function updateUpdateUserActivity() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateUserActivity());
    }, []);
}