import { useSelector } from 'react-redux'
import { selectAuth } from '@packages/auth'

function App() {
  const auth = useSelector(selectAuth)

  console.log(auth)

  return (
    <>
      {auth.isAuthenticated ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </>
  )
}

export default App
