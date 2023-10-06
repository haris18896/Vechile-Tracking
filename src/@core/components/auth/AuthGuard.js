// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useSelector } from 'react-redux'

const AuthGuard = props => {
  const { children, fallback } = props
  const user = localStorage.getItem('userData')
  const { loginInProgress } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (user === null && !user) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (loginInProgress || user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
