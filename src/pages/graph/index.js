/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import SpeedHeader from 'src/views/graphs/speed/speed-header'
import SpeedGraph from 'src/views/graphs/speed/speed-graph'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

import styled from 'styled-components'
import { GraphWrapper } from 'src/styles/pages/graphs'

function Graph() {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length
  const customers = getAllCustomersList?.data

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  const onChangeHandler = (name, value) => {
    setInputValues({ ...inputValues, [name]: value })
    if (name === 'customer_type') setSlug(value)
  }

  const [inputValues, setInputValues] = useState({
    account: '',
    assetName: '',
    all: false,
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: ''
  })

  // ** Customers
  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Slug
  useEffect(() => {
    if (slug) {
      useJwt.setSlug(slug)
      dispatch(getAllAssetTypesAction({ page, limit, slug }))
    }
  }, [slug])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit, slug }))
  }

  return (
    <GraphWrapper>
      <SpeedHeader
        slug={slug}
        open={open}
        ability={ability}
        customers={customers}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        values={inputValues}
      />

      <SpeedGraph />
    </GraphWrapper>
  )
}

Graph.acl = {
  action: 'manage',
  subject: 'manage-speed-graph'
}

Graph.AuthGuard = true

export default Graph
