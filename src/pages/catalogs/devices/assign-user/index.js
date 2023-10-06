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
import AssignUserHeader from 'src/views/catalogs/devices/AssignUser/assign-user-header'
import AssignUserTable from 'src/views/catalogs/devices/AssignUser/assign-user-table'
import DeviceListAdd from "../add";

function AssignUser() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const { loading, getAllDevicesList } = useSelector(state => state.devices)

  const rows = getAllDevicesList?.data
  const limit = getAllDevicesList?.limit
  const page = getAllDevicesList?.page
  const total = getAllDevicesList?.total

  // ** Devices List
  useEffect(() => {
    dispatch(getAllDevicesAction({ page, limit }))
  }, [])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <>
      <AssignUserHeader ability={ability} />

      <AssignUserTable
        rows={data}
        page={page}
        limit={limit}
        total={total}
        ability={ability}
        loading={loading}
        handleLimitChange={e => handleLimitChange(e)}
        handlePageChange={(e, page) => handlePageChange(page)}
      />
    </>
  )
}

AssignUser.acl = {
  action: 'manage',
  subject: 'assign-user'
}

export default AssignUser

AssignUser.acl = {
  action: 'manage',
  subject: 'manage-device'
}

AssignUser.AuthGuard = true

export const data = [
  {
    id: '1',
    asset_id: '112',
    asset_name: '766H FQ',
    plate_no: '9877HWQYY'
  },
  {
    id: '2',
    asset_id: '112',
    asset_name: '766H FQ',
    plate_no: '9877HWQYY'
  },
  {
    id: '3',
    asset_id: '112',
    asset_name: '766H FQ',
    plate_no: '9877HWQYY'
  },
  {
    id: '4',
    asset_id: '112',
    asset_name: '766H FQ',
    plate_no: '9877HWQYY'
  }
]
