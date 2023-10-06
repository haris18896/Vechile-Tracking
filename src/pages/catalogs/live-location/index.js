import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import LiveLocationTable from 'src/views/catalogs/live-location/live-location-table'
import LiveLocationHeader from 'src/views/catalogs/live-location/live-location-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Catalog } from 'src/styles/pages/catalogs'

function LiveLocation() {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'account') setAccount(value)
    if (name === 'vehicleNo') setVehicleNo(value)
  }

  // const { loading } = useSelector(state => state.)

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
      <LiveLocationHeader
        router={router}
        ability={ability}
        vehicleNo={vehicleNo}
        account={account}
        onChangeHandler={onChangeHandler}
      />

      <LiveLocationTable
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

LiveLocation.acl = {
  action: 'manage',
  subject: 'manage-live-location'
}

LiveLocation.AuthGuard = true

export default LiveLocation
