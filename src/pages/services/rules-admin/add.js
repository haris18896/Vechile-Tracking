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
import RulesAdminHeader from 'src/views/services/rules-admin/rules-admin-header'
import RulesAdminTable from 'src/views/services/rules-admin/rules-admin-table'
import { ServiceWrapper } from 'src/styles/pages/services'
import RulesAddHeader from 'src/views/services/rules-admin/Add/rules-add-header'
import RulesAdminForm from 'src/views/services/rules-admin/Add/rules-admin'

function RulesAdmin() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // const [values, setValues] = useState({
  //   account: '',
  // })

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

  console.log('slug', slug)

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)

    else{
      setValues({...values, [name]: value})
    }
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
    email_subject: Yup.string().required('Email subject is required'),
    alert_name: Yup.string().required('Alert name is required'),
    notification_email: Yup.string().required('Notification email is required'),
    email_message: Yup.string().required('Email message is required'),
    active: Yup.string().required('Active is required'),
    asset_id: Yup.string().required('Vehicle ID is required'),
    description: Yup.string().required('Description is required'),
    alert_interval: Yup.string().required('Alert interval is required'),
    cron_rule: Yup.string().required('Crone rule is required'),

  })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        account: '',
        email_subject: '',
        alert_name: '',
        notification_email: '',
        email_message: '',
        notification_mobile: '',
        system_rule: '',
        sms_message: '',
        active: '',
        cron_rule: '',
        asset_id:'',
        all_assets: false,
        description: '',
        email_check: false,
        save_alert_check: false,
        push_notification_check: false,
        sms_notification_check: false,
        desktop_notification_check: false,
        alert_interval: '',
        predefined_actions: '',

        //Parameters
        assetNo: false,
        speed: false,
        distance: false,
        location: false,
        temperature: false,

        // Alert Details
        harsh_breaking: false,
        trip_distance_travelled: false,
        harsh_acceleration: false,
        seatbelt: false,
        last_position: false,
        working_hours: false,
        obd_codes: false,
        asset_stop_report: false,
        tire_change_reminder: false,
        stopped_geofence: false,
        oil_change_reminder: false,
        overspeeding: false,
        ignition: false,
        panic: false,
        input_toggle: false,
        area_speed_violation: false,
        temperature_monitoring: false,
        power_cut: false,
        fuel_increase: false,
        ble_temp: false,
        fuel_drop: false,
        excessive_idling: false,
        geofence_arrival_departure: false,
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
      <RulesAddHeader
        slug={slug}
        open={open}
        customers={data}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        redirectURL='/services/rules-admin/'
        handleSubmit={formik.handleSubmit}
      />

      <RulesAdminForm formik={formik} />

    </ServiceWrapper>
  )
}

export const data = [
  {
    rule_id: '1',
    account: 'tracking 1',
    email_subject:  'Lorem ipsum',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'Yes',
    driver_name: 'Mohamed Ibrahim',
    id: '1',
    status: 'Expired',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    days_used: '5',
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
    rule_id: '2',
    description: 'Car Moving',
    cron_rule: '15min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    days_used: '5',
    account: 'Tracking 2',
    total_amount: '234',
    id: '2',
    status: 'Active',
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
    rule_id: '3',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'Yes',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 3',
    days_used: '5',
    total_amount: '234',
    id: '3',
    status: 'Active',
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
    rule_id: '4',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 4',
    days_used: '5',
    total_amount: '234',
    id: '4',
    status: 'Expired',
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
    rule_id: '5',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 5',
    days_used: '5',
    total_amount: '234',
    id: '5',
    status: 'Expired',
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

RulesAdmin.acl = {
  action: 'manage',
  subject: 'manage-rules-admin'
}

RulesAdmin.AuthGuard = true

export default RulesAdmin
