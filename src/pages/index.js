// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'
import useJwt from 'src/@core/auth/useJwt'

// ** Store & Actions
import { useDispatch } from 'react-redux'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  if (role === 'admin') return '/dashboard'
  if (role === 'user') return '/settings'

  // else return '/dashboard'
}

const Home = () => {
  const user = localStorage.getItem('userData')
  const token = localStorage.getItem('accessToken')

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Hooks
  const router = useRouter()

  if (router.asPath === '/') {
    router.push('/dashboard')
  }

  useEffect(() => {
    if (token && user?.role) {
      const homeRoute = getHomeRoute(user?.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
