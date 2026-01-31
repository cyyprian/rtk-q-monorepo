import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import './App.css'
import { selectAuth } from '@packages/auth'
import { useLoginMutation, useUserQuery } from './store/sharedAuth'
import { useAppDispatch } from './store'
import { setAccessToken } from '@packages/auth'

function App() {
    const dispatch = useAppDispatch()

    const auth = useSelector(selectAuth)
    const { refetch: refetchUser } = useUserQuery()

    const [login, {isSuccess: loginIsSuccess, data: loginData}] = useLoginMutation()

    useEffect(() => {
        if(loginIsSuccess) {
            // TODO: update the state by action authApi.endpoints.login.matchFulfilled
            dispatch(setAccessToken(loginData.accessToken));
        }
    }, [dispatch, loginIsSuccess, loginData])

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
