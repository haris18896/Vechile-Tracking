import { useRouter } from 'next/router'
import React, { useContext } from 'react'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Components
import WarehouseMonitoringHeader from 'src/views/tracking/warehouse-monitoring/warehouse-monitoring-header'
import WarehouseMonitoringTable from 'src/views/tracking/warehouse-monitoring/warehouse-monitoring-table'

function WarehouseMonitoring() {
  const ability = useContext(AbilityContext)
  const [account, setAccount] = React.useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'account') setAccount(value)
  }

  return (
    <>
      <WarehouseMonitoringHeader account={account} ability={ability} onChangeHandler={onChangeHandler} />
      <WarehouseMonitoringTable />
    </>
  )
}

WarehouseMonitoring.acl = {
  action: 'manage',
  subject: 'manage-warehouse-monitoring'
}

WarehouseMonitoring.AuthGuard = true

export default WarehouseMonitoring
