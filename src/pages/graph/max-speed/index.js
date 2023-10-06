/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** components
import MaxspeedHeader from 'src/views/graphs/maxspeed/maxspeed-header'
import MaxspeedGraph from 'src/views/graphs/maxspeed/maxspeed-graph'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { GraphWrapper } from 'src/styles/pages/graphs'

function Maxspeed() {
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
    date: '',
    all: false
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

  return (
    <GraphWrapper>
      <MaxspeedHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        values={inputValues}
      />

      <MaxspeedGraph />
    </GraphWrapper>
  )
}

Maxspeed.acl = {
  action: 'manage',
  subject: 'manage-max-speed-graph'
}

Maxspeed.AuthGuard = true

export default Maxspeed
