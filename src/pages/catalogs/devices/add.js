/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

import { isObjEmpty } from 'src/configs/utils'
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
import { registerDeviceAction } from 'src/store/catalogs/devices/devicesAction'

// ** Components
import { ServiceWrapper } from 'src/styles/pages/services'

import DevicesAddHeader from 'src/views/catalogs/devices/Add/devices-add-header'
import DevicesList from 'src/views/catalogs/devices/Add/devices-list'

// ** Router
import { useRouter } from 'next/router'

function DeviceListAdd() {
  // ** Router Changes
  const router = useRouter()

  const dispatch = useDispatch()
  const { getAllCustomersList, loading } = useSelector(state => state.customers)
  const { getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

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
      dispatch(getAllAssetTypesAction({ page, limit, slug, router }))
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
    imei: Yup.number().required('IMEI Number is required'),
    serial_number: Yup.number().required('Serial Number is required'),
    device_make_id: Yup.number().required('Device Make is required'),
    device_model_id: Yup.number().required('Device Modal is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      imei: '',
      serial_number: '',
      device_make_id: null,
      device_model_id: null
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('imei', values.imei)
        data.append('serial_number', values.serial_number)
        data.append('device_make_id', values.device_make_id)
        data.append('device_model_id', values.device_model_id)

        dispatch(
          registerDeviceAction({
            data,
            callback: () => {
              resetForm()
              router.push('/catalogs/devices')
            }
          })
        )
      }
    }
  })

  return (
    <ServiceWrapper>
      <DevicesAddHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        handleSubmit={formik.handleSubmit}
        redirectURL='/services/maintenance-module'
      />

      <DevicesList formik={formik} />
    </ServiceWrapper>
  )
}

DeviceListAdd.acl = {
  action: 'manage',
  subject: 'manage-device'
}

DeviceListAdd.AuthGuard = true

export default DeviceListAdd
