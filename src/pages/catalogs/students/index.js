/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import ProfileHeader from 'src/views/catalogs/profile/profile-header'
import ProfileTable from 'src/views/catalogs/profile/profile-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { getAllProfilesAction } from 'src/store/catalogs/profile/profileAction'
import { resetProfile } from 'src/store/catalogs/profile/profileSlice'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Student() {
  const ability = useContext(AbilityContext)

  const router = useRouter()
  const dispatch = useDispatch()

  const { loading, getAllProfilesList } = useSelector(state => state.profile)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)

  const rows = getAllProfilesList?.data
  const page = getAllProfilesList?.page
  const limit = getAllProfilesList?.limit
  const total = getAllProfilesList?.total

  // ** Rows filter to get only teachers data
  const filteredRows = rows?.filter(row => row.profile_type?.id === 2)

  console.log('rows : ', filteredRows)

  // ** States
  const [slug, setSlug] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'inputValue') setInputValue(value)
  }

  useEffect(() => {
    if (slug) {
      dispatch(getAllProfilesAction({ page, limit, customer_id: slug }))
    }
  }, [page, limit, slug])

  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  useEffect(() => {
    return () => {
      dispatch(resetProfile())
    }
  }, [])

  return (
    <>
      <ProfileHeader
        slug={slug}
        router={router}
        customers={customers}
        inputValue={inputValue}
        onChangeHandler={onChangeHandler}
        create={ability.can('create', 'create-student')}
        add={() => router.push('students/profile/add-edit/add?profile_type_id=2')}
      />

      <ProfileTable
        slug={slug}
        page={page}
        limit={limit}
        total={total}
        router={router}
        loading={loading}
        rows={filteredRows}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        update={ability.can('update', 'update-student')}
      />
    </>
  )
}

Student.acl = {
  action: 'manage',
  subject: 'manage-student-profile'
}

Student.AuthGuard = true

export default Student
