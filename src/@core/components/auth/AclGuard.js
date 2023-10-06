// ** React Imports
import { useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// import { useSelector } from 'react-redux'
import useJwt from 'src/auth/jwt/useJwt'

const AclGuard = props => {
  // const { loginInProgress } = useSelector(state => state.auth)
  const user = useJwt.getUserData()
  const token = useJwt.getToken()

  // ** Props
  const { aclAbilities, children, guestGuard } = props
  const [ability, setAbility] = useState(undefined)

  // console.log('aclAbilities', aclAbilities, 'guestGuard', guestGuard)

  // ** Hooks
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  if (user && user.role && !ability) {
    setAbility(buildAbilityFor(user?.is_super_admin, user.role, user.permissions, aclAbilities.subject))
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
