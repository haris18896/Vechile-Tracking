/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditWarehouseForm from 'src/views/catalogs/warehouse/edit/add-edit-warehouse-form'
import AddEditWarehouseHeader from 'src/views/catalogs/warehouse/edit/add-edit-warehouse-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Warehouse from "../index";

function AddWarehouse() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    account: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Account is required.'),
    landCoordinates: Yup.string().max(100, 'The name must not be greater than 100 characters.'),
    name: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Warehouse name is required.'),
    licenseNumber: Yup.string().required('License number is required.'),
    city: Yup.string().required('City is required.'),
    licenseIssueDate: Yup.date().required('License issue date is required.'),
    licenseExpiryDate: Yup.date().required('License expiry date is required.'),
    address: Yup.string().required('Address is required.'),
    addressFromMap: Yup.boolean(),
    phone: Yup.number().required('Phone is required.'),
    latitude: Yup.number().required('Latitude is required.'),
    longitude: Yup.number().required('Longitude is required.'),
    mobileNumber: Yup.number().required('Mobile number is required.'),
    managerEmailAddress: Yup.string().email('Invalid email address').required('Manager email address is required.'),
    landArea: Yup.number().required('Land area is required.')
  })

  const addWarehouseFormik = useFormik({
    initialValues: {
      city: '',
      name: '',
      phone: '',
      address: '',
      account: '',
      landArea: '',
      latitude: '',
      longitude: '',
      mobileNumber: '',
      licenseNumber: '',
      landCoordinates: '',
      licenseIssueDate: '',
      licenseExpiryDate: '',
      addressFromMap: false,
      managerEmailAddress: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(addWarehouseFormik.errors)) {
        const data = new FormData()
        data.append('city', values.city)
        data.append('name', values.name)
        data.append('phone', values.phone)
        data.append('account', values.account)
        data.append('address', values.address)
        data.append('latitude', values.latitude)
        data.append('landArea', values.landArea)
        data.append('longitude', values.longitude)
        data.append('mobileNumber', values.mobileNumber)
        data.append('licenseNumber', values.licenseNumber)
        data.append('addressFromMap', values.addressFromMap)
        data.append('landCoordinates', values.landCoordinates)
        data.append('licenseIssueDate', values.licenseIssueDate)
        data.append('licenseExpiryDate', values.licenseExpiryDate)
        data.append('managerEmailAddress', values.managerEmailAddress)

        // dispatch(registerWarehouseAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditWarehouseHeader
        loading={false}
        router={router}
        formik={addWarehouseFormik}
        submitHandler={addWarehouseFormik.handleSubmit}
      />

      <AddEditWarehouseForm router={router} formik={addWarehouseFormik} />
    </>
  )
}

AddWarehouse.acl = {
  action: 'manage',
  subject: 'manage-warehouse'
}

AddWarehouse.AuthGuard = true

export default AddWarehouse
