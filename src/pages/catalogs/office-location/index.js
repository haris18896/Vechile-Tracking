import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import OfficeLocationHeader from 'src/views/catalogs/office-location/office-location-header'
import OfficeLocationTable from 'src/views/catalogs/office-location/office-location-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

import { Box, Tab, Tabs } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { Catalog } from 'src/styles/pages/catalogs'

function OfficeLocation() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const router = useRouter()
  const [office, setOffice] = useState('')
  const [account, setAccount] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'office') setOffice(value)
    if (name === 'account') setAccount(value)
  }

  // const { loading } = useSelector(state => state)

  // // **  List
  // useEffect(() => {
  // }, [])

  const handleLimitChange = e => {
    // dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    // dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <Catalog>
      <OfficeLocationHeader
        router={router}
        office={office}
        account={account}
        ability={ability}
        onChangeHandler={onChangeHandler}
      />

      <OfficeLocationTable
        rows={[]}
        page={1}
        limit={10}
        total={10}
        router={router}
        ability={ability}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </Catalog>
  )
}

OfficeLocation.acl = {
  action: 'manage',
  subject: 'manage-office-location'
}

OfficeLocation.AuthGuard = true

export default OfficeLocation
