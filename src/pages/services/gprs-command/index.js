/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, use } from 'react'

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
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import GprsAddHeader from 'src/views/services/gprs-command/Add/gprs-add-header'
import GprsCommand from 'src/views/services/gprs-command/Add/gprs-command'
import { ServiceWrapper } from 'src/styles/pages/services'
import GprsHeader from 'src/views/services/gprs-command/gprs-header'
import GprsTable from 'src/views/services/gprs-command/gprs-table'
import Link from 'next/link'
import { Icon } from '@iconify/react'

function GPRSCommand() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)
  const [showReport, setShowReport] = useState(false)
  const [showData, setShowData] = useState(false)

  const [values, setValues] = useState({
    account: '',
    asset: '',
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: '',
    all: false
  })

  // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  // ** State
  const [slug, setSlug] = useState('')

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  // ** Customers

  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

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
    asset_name: Yup.string().required('Asset Name is required'),
    command: Yup.string().required('Command is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      account: '',
      command_type: '',
      asset_name: '',
      parameter: '',
      command: '',
      all_assets: ''
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

  const handleReportShow = state => {
    setShowReport(state)
  }

  const handleShowData = () => {
    setShowData(true)
  }

  const buttonStyles = {
    '&.MuiButtonBase-root': {
      fontWeight: '700',
      fontSize: '1rem',
      borderRadius: 0,
      padding: '0 0 0.2rem 0'
    },

    '&.MuiButtonBase-root:hover': {
      background: 'none'
    }
  }

  return (
    <ServiceWrapper>
      {showReport ? (
        <>
          <Box px={12} mt={3} display='flex' alignItems='center' gap={3}>
            <Button onClick={() => handleReportShow(false)} sx={buttonStyles}>
              GPRS Command
            </Button>

            <Icon icon='iconamoon:arrow-right-2-light' fontSize={22} color='#556485' />

            <Button sx={buttonStyles} style={{ borderBottom: '2px solid #00ABBE' }}>
              Reports
            </Button>
          </Box>

          <GprsHeader customers={rows} onChangeHandler={handleChange} values={values} handleShowData={handleShowData} />
          <GprsTable
            rows={showData && data}
            page={page}
            total={total}
            limit={limit}
            loading={loading}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <GprsAddHeader
            handleReport={handleReportShow}
            handleSubmit={formik.handleSubmit}
            resetForm={formik.resetForm}
          />
          <GprsCommand customers={getAllCustomersList?.data} formik={formik} />
        </>
      )}
    </ServiceWrapper>
  )
}

export const data = [
  {
    asset_name: '1245 GTF',
    driver_name: 'Mohamed Ibrahim',
    id: '1',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    command: 'Command sent',
    input: 'Input sent',
    reply_string: 'Reply String',
    received_command: 'Yes',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  },
  {
    asset_name: '1245 GTF',
    driver_name: 'Mohamed Ibrahim',
    id: '2',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    command: 'Command sent',
    input: 'Input sent',
    reply_string: 'Reply String',
    received_command: 'No',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  },
  {
    asset_name: '1245 GTF',
    driver_name: 'Mohamed Ibrahim',
    id: '3',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    command: 'Command sent',
    input: 'Input sent',
    reply_string: 'Reply String',
    received_command: 'Yes',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  },
  {
    asset_name: '1245 GTF',
    driver_name: 'Mohamed Ibrahim',
    id: '4',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    command: 'Command sent',
    input: 'Input sent',
    reply_string: 'Reply String',
    received_command: 'No',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  },
  {
    asset_name: '1245 GTF',
    driver_name: 'Mohamed Ibrahim',
    id: '5',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    command: 'Command sent',
    input: 'Input sent',
    reply_string: 'Reply String',
    received_command: 'Yes',
    address: 'King Fahad Road, Riyadh, Saudi Arabia'
  }
]

GPRSCommand.acl = {
  action: 'manage',
  subject: 'manage-gprs-command'
}

GPRSCommand.AuthGuard = true

export default GPRSCommand
