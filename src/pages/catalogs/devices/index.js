/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'

// ** Components
import DeviceTable from 'src/views/catalogs/devices/devices-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllDevicesAction, handlePageAction, handleLimitAction } from 'src/store/catalogs/devices/devicesAction'
import DevicesHeader from 'src/views/catalogs/devices/devices-header'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useRouter } from 'next/router'

function Devices() {
  const ability = useContext(AbilityContext)

  const router = useRouter()

  const dispatch = useDispatch()
  const { loading, getAllDevicesList } = useSelector(state => state.devices)

  const rows = getAllDevicesList?.data
  const limit = getAllDevicesList?.limit
  const page = getAllDevicesList?.page
  const total = getAllDevicesList?.total

  // ** Devices List
  useEffect(() => {
    dispatch(getAllDevicesAction({ page, limit }))
  }, [router])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = page => {
    dispatch(handlePageAction({ page: page, limit }))
  }

  return (
    <>
      <DevicesHeader ability={ability} />

      <DeviceTable
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        ability={ability}
        loading={loading}
        handleLimitChange={e => handleLimitChange(e)}
        handlePageChange={page => handlePageChange(page)}
      />
    </>
  )
}

Devices.acl = {
  action: 'manage',
  subject: 'manage-device'
}

Devices.AuthGuard = true

export default Devices
