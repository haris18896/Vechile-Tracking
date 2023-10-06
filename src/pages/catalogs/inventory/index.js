import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import InventoryTable from 'src/views/catalogs/inventory/inventory-table'
import InventoryHeader from 'src/views/catalogs/inventory/inventory-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Inventory() {
  const ability = useContext(AbilityContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const [account, setAccount] = useState('')
  const [warehouse, setWarehouse] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'account') setAccount(value)
    if (name === 'warehouse') setWarehouse(value)
  }

  // const { loading } = useSelector(state => state)

  // // ** List
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
      <InventoryHeader
        router={router}
        ability={ability}
        account={account}
        warehouse={warehouse}
        onChangeHandler={onChangeHandler}
      />

      <InventoryTable
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

Inventory.acl = {
  action: 'manage',
  subject: 'manage-inventory'
}

Inventory.AuthGuard = true

export default Inventory
