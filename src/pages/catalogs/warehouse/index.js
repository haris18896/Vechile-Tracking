import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import WarehouseTable from 'src/views/catalogs/warehouse/warehouse-table'
import WarehouseHeader from 'src/views/catalogs/warehouse/warehouse-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Warehouse() {
  const ability = useContext(AbilityContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const [account, setAccount] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'account') setAccount(value)
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
    <>
      <WarehouseHeader router={router} ability={ability} account={account} onChangeHandler={onChangeHandler} />

      <WarehouseTable
        rows={[]}
        page={1}
        limit={10}
        total={10}
        router={router}
        ability={ability}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </>
  )
}

Warehouse.acl = {
  action: 'manage',
  subject: 'manage-warehouse'
}

Warehouse.AuthGuard = true

export default Warehouse
