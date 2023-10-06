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
import TaskManagementAddHeader from 'src/views/services/task-management/Add/taskManagement-add-header'
import TaskManagement from 'src/views/services/task-management/Add/task-management'
import { ServiceWrapper } from 'src/styles/pages/services'

function TaskManagementEdit() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

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
    assign_job: Yup.string().required('Assign Job is required'),
    job: Yup.string().required('Job Type is required'),
    asset_name: Yup.string().required('Asset name is required'),
    mobile_no: Yup.string().matches(/^\d{11}$/, 'Invalid mobile number'),
    customer_mobile: Yup.string().required('Customer Mobile No. is required').matches(/^\d{11}$/, 'Invalid mobile number'),
    delivery_time: Yup.string().required('Delivery time is required'),
    file: Yup.mixed()
    .test('fileType', 'Invalid file format', (value) => {
      if (!value) return true;
      console.log('value --<>', value)
      const supportedFormats = ['xml', 'docx', 'pdf', 'csv'];
      const fileExtension = value?.split('.').pop().toLowerCase();

      return supportedFormats.includes(fileExtension);
    }),
  })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        account: '',
        invoice_no: '',
        assign_job: '',
        file: '',
        job: '',
        invoice_amount: '',
        asset_name: '',
        material_desc: '',
        mobile_no: '',
        quantity: '',
        customer: '',
        delivery_date: '',
        customer_mobile: '',
        delivery_time: '',
        notification_email: '',
        halt_time: '',
        search_by: '',
        driver_note: ''
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
      <TaskManagementAddHeader
        handleSubmit = {formik.handleSubmit}
      />

      <TaskManagement customers={rows} formik={formik} />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '3',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '4',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '5',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '6',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '7',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '8',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
  {
    id: '9',
    vehicle_no: '1245 GFR',
    driver_name: 'Mohamed Ibrahim',
    mobile_no: '123456789',
    customer: 'Tracking',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
]

export default TaskManagementEdit
