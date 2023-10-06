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
import IdleHeader from 'src/views/graphs/idle/idle-header'
import IdleGraph from 'src/views/graphs/idle/idle-graph'
import { GraphWrapper } from 'src/styles/pages/graphs'

function Idle() {
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

  return (
    <GraphWrapper>
      <IdleHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        values={inputValues}
      />

      <IdleGraph />
    </GraphWrapper>
  )
}

Idle.acl = {
  action: 'manage',
  subject: 'manage-idle-graph'
}

Idle.AuthGuard = true

export default Idle
