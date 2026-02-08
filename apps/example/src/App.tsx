import { useSelector } from 'react-redux';

import './App.css';
import {
    selectAuth,
    useUserQuery,
    useLoginMutation,
} from './core/sharedAuth';

function App() {
    const auth = useSelector(selectAuth);

    const { refetch: refetchUser } = useUserQuery();
    const [login] = useLoginMutation();

    return (
        <>
            {auth.isAuthenticated ? <div>Authenticated</div> : <div>Not Authenticated</div>}
            {!auth.accessToken
                ? <div>No access token</div>
                : auth.isInvalid ? <div>Auth is invalid</div> : <div>Auth is valid</div>}
            <hr />
            <button onClick={() => login({ username: 'emilys', password: 'emilyspass' })}>Login</button>
            <button onClick={() => refetchUser()}>Get User</button>
        </>
    )
}

export default App
