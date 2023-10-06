/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

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
import FineManagementAddHeader from 'src/views/services/fine-management/Add/fineManagement-add-header'
import FineManagement from 'src/views/services/fine-management/Add/fine-management'
import { ServiceWrapper } from 'src/styles/pages/services'

function Services() {
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


      // FORMIK

    // ** Form Validation
    const schema = Yup.object().shape({
      fine_no: Yup.number().required('Fine No. is required'),
      fine_desc: Yup.string().required('Fine Description is required'),
      account: Yup.string().required('Account is required'),
      amount: Yup.number("Only numbers are valid").required('Amount is required'),
      driver: Yup.string().required('Driver is required'),
      vehicle_id: Yup.string().required('Vehicle ID is required'),
      fine_date: Yup.string().required('Fine Date is required'),
      fine_time: Yup.string().required('Fine Time is required'),
      status: Yup.string().required('Fine Status is required'),
    })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        fine_no: '',
        fine_desc: '',
        account: '',
        amount: '',
        driver: '',
        vehicle_id: '',
        fine_date: '',
        fine_time: '',
        status: '',
      },
      validationSchema: schema,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        if (isObjEmpty(formik.errors)) {
          const data = {}
  
          const role = useJwt.getUserData().role
  
          if (role === 'admin') {
            data.user_type = 'main_db_admin'
          }
  
          if (slug) {
            data.slug = slug
          }
  
          console.log('data to be submitted', data)
  
          resetForm()
          handleClose()
        }
      }
    })


  return (
    <ServiceWrapper>
      <FineManagementAddHeader
        slug={slug}
        open={open}
        customers={data}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        handleSubmit = {formik.handleSubmit}
      />

      <FineManagement customers={getAllCustomersList?.data} formik={formik}  />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '3',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '4',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '5',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '6',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
]

export default Services
