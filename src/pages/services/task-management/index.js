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
import TaskManagementHeader from 'src/views/services/task-management/task-management-header'
import TaskManagementTable from 'src/views/services/task-management/task-management-table'
import { ServiceWrapper } from 'src/styles/pages/services'

function TaskManagement() {
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

  // ========= States =========

  const [values, setValues] = useState({
    account: '',
    vehicle: '',
    driver: '',
    customer: '',
    date_from: '',
    date_to: ''
  })

  // Change Handler
  const changeHandler = (name, value) => {
    setValues({ ...values, [name]: value })
  }

      // FORMIK

    // ** Form Validation
    const schema = Yup.object().shape({
      // account: Yup.string().required('Account is required'),
      // vehicle_no: Yup.string().required('Vehicle Number is required'),
      // driver: Yup.string().required('Driver name is required'),
      // file: Yup.string().required('File is required is required'),
    })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        account: '',
        vehicle_no: '',
        driver: '',
        file: ''
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
      <TaskManagementHeader
        slug={slug}
        open={open}
        customers={data}
        handleOpen={handleOpen}
        handleClose={handleClose}
        changeHandler={changeHandler}
        values= {values}
        formik = {formik}
      />
      <TaskManagementTable
        rows={rows}
        page={1}
        total={total}
        limit={5}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
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
    customer: 'Tracking 1',
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
    customer: 'Tracking 2',
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
    customer: 'Tracking 3',
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
    customer: 'Tracking 4',
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
    customer: 'Tracking 5',
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
    customer: 'Tracking 6',
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
    customer: 'Tracking 7',
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
    customer: 'Tracking 8',
    customer_mobile: '123456789',
    job: 'Job To',
    job_date: '2021-05-01T12:00:00',
    job_time: '15:06:11',
    job_type :"Pick up",
    status: 'idle',
    created_at: '16 May 2021'
  },
]


export default TaskManagement
