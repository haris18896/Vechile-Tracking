import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import EmployeesTable from 'src/views/catalogs/employees/employees-table'
import EmployeesHeader from 'src/views/catalogs/employees/employees-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Employees() {
  const ability = useContext(AbilityContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const [bus, setBus] = useState('')
  const [tag, setTag] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [account, setAccount] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'bus') setBus(value)
    if (name === 'tag') setTag(value)
    if (name === 'name') setName(value)
    if (name === 'mobile') setMobile(value)
    if (name === 'account') setAccount(value)
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
      <EmployeesHeader
        bus={bus}
        tag={tag}
        name={name}
        router={router}
        mobile={mobile}
        account={account}
        ability={ability}
        onChangeHandler={onChangeHandler}
      />

      <EmployeesTable
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

Employees.acl = {
  action: 'manage',
  subject: 'manage-employee'
}

Employees.AuthGuard = true

export default Employees
