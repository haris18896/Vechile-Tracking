/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
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
import RulesAddHeader from 'src/views/services/rules-admin/Add/rules-add-header'
import RulesAdmin from 'src/views/services/rules-admin/Add/rules-admin'
import { ServiceWrapper } from 'src/styles/pages/services'
import FuelConsumedAddHeader from 'src/views/services/fuel-consumed/Add/fuel-consumed-add-header'
import FuelConsumed from 'src/views/services/fuel-consumed/Add/fuel-consumed'

function FuelConsumedAdd() {
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

  const customers = [
    {
      company_name: 'Gorex'
    }
  ]

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  console.log('slug', slug)

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
  }

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

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit, slug }))
  }

  const schema = Yup.object().shape({
    account: Yup.string().required('Account is required'),
    driver: Yup.string().required('Driver is required'),
    asset: Yup.string().required('Asset Name is required'),
  })

  const formik = useFormik({
    initialValues: {
      account: '',
      asset: '',
      date: '',
      time: '',
      driver: '',
      fuel_filled: '',
      odometer: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('account', values.account)

        dispatch(
          updateAssetAction({
            id,
            data,
            callBack: () => {
              router.back()
              resetForm()
            }
          })
        )
      }
    }
  })


  return (
    <ServiceWrapper>
      <FuelConsumedAddHeader
        formik = {formik}
      />

      <FuelConsumed formik={formik} data={data} />
    </ServiceWrapper>
  )
}

export const data = [
  {
    driver_name: 'Mohamed Ibrahim',
    customer: 'Tracking 1',
    time: '10 mins',
    id: '1',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    fuel_filled: 'N/A',
    days_used: '5',
    asset_name: '770IJA',
    total_amount: '234',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '16 May 2021'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    days_used: '5',
    customer: 'Tracking 2',
    time: '10 mins',
    asset_name: '770IJA',
    total_amount: '234',
    fuel_filled: 'N/A',
    id: '2',
    status: 'driving',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '44',
    odometer: '1234567',
    ignition_status: 'on',
    gps_status: 'on',
    gsm_status: 'on',
    battery: '100',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '16 Feb 2021'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    customer: 'Tracking 3',
    time: '20 mins',
    days_used: '5',
    total_amount: '234',
    fuel_filled: 'N/A',
    id: '3',
    status: 'stopped',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '13 Jan 2023'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    customer: 'Tracking 4',
    time: '30 mins',
    days_used: '5',
    total_amount: '234',
    fuel_filled: 'N/A',
    id: '4',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '11 July 2022'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    customer: 'Tracking 5',
    time: '5 mins',
    days_used: '5',
    total_amount: '234',
    fuel_filled: 'N/A',
    id: '5',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '11 June 2022'
  }
]

FuelConsumedAdd.acl = {
  action: 'manage',
  subject: 'manage-fuel-consumed'
}

FuelConsumedAdd.AuthGaurd = true

export default FuelConsumedAdd
