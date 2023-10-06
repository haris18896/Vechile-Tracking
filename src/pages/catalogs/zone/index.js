import React, { useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import ZoneHeader from 'src/views/catalogs/zone/zone-header'
import ZoneTable from 'src/views/catalogs/zone/zone-table'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Zone() {
  // ** Ability to check which users can create
  const ability = useContext(AbilityContext)

  // ** Router
  const router = useRouter()

  return (
    <>
      <ZoneHeader router={router} ability={ability} />

      <ZoneTable router={router} ability={ability} />
    </>
  )
}

Zone.acl = {
  action: 'manage',
  subject: 'manage-zone'
}

Zone.AuthGuard = true

export default Zone
