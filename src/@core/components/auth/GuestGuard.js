// ** React Imports
import { useEffect } from 'react'


import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useJwt from 'src/auth/jwt/useJwt'

// ** Hooks Import

const GuestGuard = props => {
  const { loginInProgress } = useSelector(state => state.auth)
  const user = useJwt.getUserData()
  const { children, fallback } = props
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem('userData')) {
      router.replace('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (loginInProgress || (!loginInProgress && user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
