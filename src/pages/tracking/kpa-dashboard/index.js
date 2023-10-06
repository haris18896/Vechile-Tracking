import React, { useContext, useState } from 'react'
import dynamic from 'next/dynamic'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Components
import Spinner from 'src/@core/components/spinner'

const KPADashboardHeader = dynamic(() => import('src/views/tracking/kpa-dashboard/kpa-dashboard-header'), {
  ssr: false
})

const VehicleKPADashboard = dynamic(() => import('src/views/tracking/kpa-dashboard/vehicle-kpa-dashboard'), {
  ssr: false,
  loading: () => <Spinner sx={{ height: '86vh ' }} />
})

const SafetyKPADashboard = dynamic(() => import('src/views/tracking/kpa-dashboard/safety-kpa-dashboard'), {
  ssr: false,
  loading: () => <Spinner sx={{ height: '86vh ' }} />
})

const DriverKPADashboard = dynamic(() => import('src/views/tracking/kpa-dashboard/driver-kpa-dashboard'), {
  ssr: false,
  loading: () => <Spinner sx={{ height: '86vh ' }} />
})

function KPADashboard() {
  const ability = useContext(AbilityContext)
  const [tab, setTab] = useState('vehicle')
  const [toTime, setToTime] = useState('')
  const [toDate, setToDate] = useState('')
  const [account, setAccount] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [geofence, setGeofence] = useState('')
  const [allGeofence, setAllGeofence] = useState(false)

  const onChangeHandler = (name, value) => {
    if (name === 'tab') setTab(value)
    if (name === 'toDate') setToDate(value)
    if (name === 'toTime') setToTime(value)
    if (name === 'account') setAccount(value)
    if (name === 'fromDate') setFromDate(value)
    if (name === 'fromTime') setFromTime(value)
    if (name === 'geofence') setGeofence(value)
    if (name === 'allGeofence') setAllGeofence(value)
  }

  return (
    <>
      <KPADashboardHeader
        tab={tab}
        toDate={toDate}
        toTime={toTime}
        ability={ability}
        account={account}
        fromDate={fromDate}
        fromTime={fromTime}
        geofence={geofence}
        allGeofence={allGeofence}
        onChangeHandler={onChangeHandler}
      />
      <hr />
      {tab === 'vehicle' ? <VehicleKPADashboard /> : tab === 'safety' ? <SafetyKPADashboard /> : <DriverKPADashboard />}
    </>
  )
}

KPADashboard.acl = {
  action: 'manage',
  subject: 'manage-kpa-dashboard'
}

KPADashboard.AuthGuard = true

export default KPADashboard
