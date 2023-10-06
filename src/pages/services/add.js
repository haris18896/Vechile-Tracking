/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'
import AssetTypesAddHeader from 'src/views/services/asset-types/Add/asset-type-add-header'
import AssetTypesFrom from 'src/views/services/asset-types/Add/asset-type'
import { ServiceWrapper } from 'src/styles/pages/services'
import AllocateAssets from './index'

function AllocateAssetsAdd() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // ===== Main Variables
  // const rows = getAllAssetTypesList?.data
  // const page = getAllAssetTypesList?.page
  // const limit = getAllAssetTypesList?.limit
  // const total = getAllAssetTypesList?.data.length

  // ===== Test Variables
  const rows = data
  const page = 3
  const limit = data?.limit
  const total = data?.length

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  // ** Customers
  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason && reason == 'backdropClick' && 'escapeKeyDown') return

    setOpen(false)
  }
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

  const schema = Yup.object().shape({
    account: Yup.string().required('Account name is required'),
    allocate_to: Yup.string().required('Allocate to is required'),
    asset_name: Yup.string().required('Asset name is required'),
    driver_name: Yup.string().required('Driver name is required')
  })

  const formik = useFormik({
    initialValues: {
      account: '',
      assignment_type: '',
      allocate_to: '',
      mobile_no: '',
      asset_name: '',
      emp_id: '',
      driver_name: '',
      current_odometer: '',
      license_no: '',
      vehicle_condition: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(allocateAssetsFormik.errors)) {
        const data = new FormData()
        data.append('account', values.account)
        data.append('startTime', values.startTime)
        data.append('endTime', values.endTime)
        data.append('shiftName', values.shiftName)
        data.append('assignAsset', values.assignAsset)
        data.append('allAssets', values.allAssets)

        // dispatch(registerWorkingHoursAction({ data, router }))
      }
    }
  })

  return (
    <ServiceWrapper>
      <AssetTypesAddHeader
        slug={slug}
        open={open}
        handleSubmit={formik.handleSubmit}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />

      <AssetTypesFrom formik={formik} data={rows} />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    driver_name: 'Mohamed Ibrahim',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 1',
    asset_name: 'Driver',
    allocation: 'Mohamed Ibrahim',
    license_no: '23412231',
    license_type: 'Permanent',
    sponsor: 'N/A',
    vehicle_condition: 'A Grade',
    current_odometer: '100 Km/h',
    emp_id: '121',
    emp_status: 'Part time',
    nationality: 'Emirati',
    mobile_no: '009221231',
    asset_type: 'Light Vehicle',
    days_used: '5',
    status: 'Active',
    total_amount: '234',
    address: '123 Main Street, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '16 May 2021',
    dob_format: ''
  },
  {
    id: '2',
    driver_name: 'Shoaib',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 2',
    asset_name: 'Driver',
    allocation: 'Shoaib',
    license_no: '8892231',
    license_type: 'Permanent',
    sponsor: 'N/A',
    vehicle_condition: 'B Grade',
    current_odometer: '80 Km/h',
    emp_id: '122',
    emp_status: 'full time',
    nationality: 'Indian',
    mobile_no: '009254412',
    asset_type: 'Light Vehicle',
    days_used: '3',
    status: 'Expired',
    total_amount: '884',
    address: '456 Oak Avenue, Abu Dhabi, 54321, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '2 Dec 2021'
  },
  {
    id: '3',
    driver_name: 'Ali Raza',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 3',
    asset_name: 'Driver',
    allocation: 'Ali Raza',
    license_no: '76712231',
    license_type: 'Temporary',
    sponsor: 'N/A',
    vehicle_condition: 'A Grade',
    current_odometer: '95 Km/h',
    emp_id: '123',
    emp_status: 'full time',
    nationality: 'Pakistani',
    mobile_no: '0092445333',
    asset_type: 'Heavy Vehicle',
    days_used: '3',
    status: 'Active',
    total_amount: '884',
    address: '654 Cedar Drive, Ajman, 86420, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '6 June 2021'
  },
  {
    id: '4',
    driver_name: 'Sara',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 4',
    asset_name: 'Driver',
    allocation: 'Sara',
    license_type: 'Temporary',
    sponsor: 'N/A',
    license_no: '9877721',
    vehicle_condition: 'A Grade',
    current_odometer: '92 Km/h',
    emp_id: '124',
    emp_status: 'Part time',
    nationality: 'Emirati',
    mobile_no: '009211289',
    asset_type: 'Heavy Vehicle',
    days_used: '1',
    status: 'Expired',
    total_amount: '233',
    address: '321 Pine Road, Sharjah, 13579, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '26 June 2021'
  }
]

AllocateAssetsAdd.acl = {
  action: 'manage',
  subject: 'manage-allocate-asset'
}

AllocateAssetsAdd.AuthGuard = true

export default AllocateAssetsAdd
