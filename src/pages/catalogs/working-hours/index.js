import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import WorkingHoursHeader from 'src/views/catalogs/working-hours/working-hours-header'
import WorkingHoursTable from 'src/views/catalogs/working-hours/working-hours-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function WorkingHours() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const router = useRouter()
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
      <WorkingHoursHeader router={router} ability={ability} account={account} onChangeHandler={onChangeHandler} />

      <WorkingHoursTable
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

WorkingHours.acl = {
  action: 'manage',
  subject: 'manage-working-hours'
}

WorkingHours.AuthGuard = true

export default WorkingHours
