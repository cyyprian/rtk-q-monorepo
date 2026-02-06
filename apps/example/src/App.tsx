import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import './App.css'
import { 
    selectAuth,
    getUseUserQuery,
    getUseLoginMutation
} from '@packages/auth'
import { setAccessToken } from '@packages/auth'

function App() {
    const dispatch = useDispatch()

    const auth = useSelector(selectAuth)

    const { refetch: refetchUser } = getUseUserQuery()()
    const [login, {
        isSuccess: loginIsSuccess,
        data: loginData
    }] = getUseLoginMutation()()

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
