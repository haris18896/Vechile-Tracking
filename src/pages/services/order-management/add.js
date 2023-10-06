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
import OrderManagementAddHeader from 'src/views/services/order-management/Add/orderManagement-add-header'
import OrderManagement from 'src/views/services/order-management/Add/order-management'
import { ServiceWrapper } from 'src/styles/pages/services'

function OrderManagementAdd() {
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
      account: Yup.string().required('Account is required'),
      cost: Yup.string().required('Cost is required'),
      work_order_no: Yup.string().required('Work Order No. is required'),
      labor_time: Yup.string().required('Labor Time is required').matches(/^\d+$/, 'Labor Time must be a number'),
      vehicle_id: Yup.string().required('Vehicle ID is required'),
      order_status: Yup.string().required('Order Status is required'),
      service_type: Yup.string().required('Service Type is required'),
      date_in: Yup.string().required('Date In is required'),
      technician_name: Yup.string().required('Technician Name is required'),
      date_out: Yup.string().required('Date Out is required'),
      location: Yup.string().required('Location is required'),
      solution: Yup.string().required('Solution is required'),
    })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        account: '',
        cost: '',
        work_order_no: '',
        labor_time: '',
        vehicle_id: '',
        order_status: '',
        service_type: '',
        date_in: '',
        technician_name: '',
        date_out: '',
        location: '',
        solution: '',
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
      <OrderManagementAddHeader
        handleSubmit = {formik.handleSubmit}
        redirectURL='/services/order-management'
      />

      <OrderManagement formik={formik} data = {data} />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    customer: 'Tracking 1',
    asset_name: '716 FTG',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '716 FTG',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    customer: 'Tracking 2',
    asset_name: '1234 TGH',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '1234 TGH',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '3',
    customer: 'Tracking 3',
    asset_name: '788 GTH',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '788 GTH',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '4',
    customer: 'Tracking 4',
    asset_name: '099 YQT',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '099 YQT',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
]

export default OrderManagementAdd
