/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import FuelHeader from 'src/views/graphs/fuel/fuel-header'
import FuelGraph from 'src/views/graphs/fuel/fuel-graph'
import { GraphWrapper } from 'src/styles/pages/graphs'

function Fuel() {
  const dispatch = useDispatch()
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  const [inputValues, setInputValues] = useState({
    account: '',
    assetName: '',
    all: false,
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: '',
    interval: ''
  })

  const onChangeHandler = (name, value) => {
    setInputValues({ ...inputValues, [name]: value })
    if (name === 'customer_type') setSlug(value)
  }

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

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit, slug }))
  }

  return (
    <GraphWrapper>
      <FuelHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        values={inputValues}
      />

      <FuelGraph />
    </GraphWrapper>
  )
}

Fuel.acl = {
  action: 'manage',
  subject: 'manage-fuel-graph'
}

Fuel.AuthGuard = true

export default Fuel
