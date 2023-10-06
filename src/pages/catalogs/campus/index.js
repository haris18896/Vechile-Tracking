/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Components
import CampusTable from 'src/views/catalogs/campus/campus-table'
import CampusesHeader from 'src/views/catalogs/campus/campus-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllCampusesAction, handleLimitAction, handlePageAction } from 'src/store/catalogs/campus/campusAction'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function Campus() {
  const ability = useContext(AbilityContext)

  const router = useRouter()
  const dispatch = useDispatch()
  const { getAllCampusesList, loading } = useSelector(state => state.campus)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)

  const rows = getAllCampusesList?.data
  const page = getAllCampusesList?.page
  const limit = getAllCampusesList?.limit
  const total = getAllCampusesList?.total

  // ** States
  const [slug, setSlug] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'inputValue') setInputValue(value)
  }

  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  // ** List
  useEffect(() => {
    if (slug) {
      dispatch(getAllCampusesAction({ page, limit, customer_id: slug }))
    }
  }, [page, limit, slug])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  return (
    <>
      <CampusesHeader
        slug={slug}
        router={router}
        ability={ability}
        customers={customers}
        inputValue={inputValue}
        onChangeHandler={onChangeHandler}
      />

      <CampusTable
        slug={slug}
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        router={router}
        ability={ability}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

Campus.acl = {
  action: 'manage',
  subject: 'manage-campus'
}

export default Campus
