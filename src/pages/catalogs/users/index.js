/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import UsersHeader from 'src/views/catalogs/users/users-header'
import UsersTable from 'src/views/catalogs/users/users-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { getAllUsersAction, handleLimitAction, handlePageAction } from 'src/store/catalogs/users/usersActions'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useRouter } from 'next/router'
import { Catalog } from 'src/styles/pages/catalogs'

function Users() {
  const ability = useContext(AbilityContext)

  // ** Diapatch
  const dispatch = useDispatch()

  // ** Router
  const router = useRouter()

  // ** Selctors Users and Destructure Properties Redux
  const { loading, getAllUsersList } = useSelector(state => state.users)
  const rows = getAllUsersList?.data || []
  const page = getAllUsersList?.page || 1
  const total = getAllUsersList?.total || 0
  const limit = getAllUsersList?.limit || 10

  // ** Model States
  const [open, setOpen] = useState({
    register: false,
    update: false,
    delete: false
  })

  // Managing Open
  const handleOpen = state => {
    setOpen(prevOpen => ({
      ...prevOpen, // Copy all existing key-value pairs
      [state]: true // Update the specified key to true, others will remain the same
    }))
  }

  // ** State
  // const [open, setOpen] = useState(false)

  // ** Handle Modal
  // const handleOpen = () => {
  //   setOpen(true)
  //   dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  // }
  const handleClose = () => setOpen(false)

  // Fetch Users List
  useEffect(() => {
    dispatch(getAllUsersAction({ page, limit }))
  }, [page, limit, router])

  // ** Handle Limit and Page
  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  // Refresh User
  const refresUserList = () => {
    dispatch(getAllUsersAction({ page: 1, limit: 10 }))
  }

  return (
    <>
      <Catalog>
        <UsersHeader
          open={open}
          ability={ability}
          handleOpen={handleOpen}
          handleClose={handleClose}
          refresUserList={refresUserList}
          state={'register'}
        />
        <UsersTable
          rows={rows}
          page={page}
          limit={limit}
          total={total}
          ability={ability}
          loading={loading}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
        />
      </Catalog>
    </>
  )
}

Users.acl = {
  action: 'manage',
  subject: 'manage-user'
}

Users.AuthGuard = true

export default Users
