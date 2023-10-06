/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import TemperatureHeader from 'src/views/graphs/temperature/temp-header'
import TemperatureGraph from 'src/views/graphs/temperature/temp-graph'
import { GraphWrapper } from 'src/styles/pages/graphs'

function Temperature() {
  const dispatch = useDispatch()
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

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
    to_time: '',
    interval: ''
  })

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
      <TemperatureHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        values={inputValues}
      />

      <TemperatureGraph />
    </GraphWrapper>
  )
}

Temperature.acl = {
  action: 'manage',
  subject: 'manage-temperature-graph'
}

Temperature.AuthGuard = true

export default Temperature
