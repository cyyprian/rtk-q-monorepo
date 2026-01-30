import { useSelector } from 'react-redux'
import './App.css'
import { selectAuth } from '@packages/auth'
import { useUserQuery } from './store/sharedAuth'

function App() {
  const auth = useSelector(selectAuth)
  const { data: user } = useUserQuery()
  console.log('user', user)

  return (
    <>
      {auth.isAuthenticated ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </>
  )
}

export default App
