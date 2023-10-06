/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditCampusForm from 'src/views/catalogs/campus/edit/edit-campus-form'
import AddEditCampusHeader from 'src/views/catalogs/campus/edit/campus-edit-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { resetCampus } from 'src/store/catalogs/campus/campusSlice'
import { getCampusByIdAction, updateCampusAction } from 'src/store/catalogs/campus/campusAction'
import AddEditDriverHeader from 'src/views/catalogs/drivers/edit/add-edit-driver-header'
import AddEditDriverForm from 'src/views/catalogs/drivers/edit/add-edit-driver-form'
import AddDriver from './add'
import { useTranslation } from 'react-i18next'

function EditDriver() {
  const { t, rtl } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, getCampus } = useSelector(state => state.campus)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)
  const current_driver = useSelector(state => state.driver?.getDriver?.data)

  const { id, customer_id } = router.query

  // ** States
  const [slug, setSlug] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const [location, setLocation] = useState({
    lat: getCampus?.data?.lat,
    lng: getCampus?.data?.lng
  })
  const [currentLocation, setCurrentLocation] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getCampusByIdAction({ id, customer_id }))
    }
  }, [id])

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'inputValue') setInputValue(value)
    if (name === 'location')
      setLocation({
        lat: value.latLng.lat(),
        lng: value.latLng.lng()
      })
  }

  const schema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    contact_number: Yup.string().required('Contact Number is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address is required'),
    nationality: Yup.string().required('Nationality is required'),
    license_number: Yup.string().required('License Number is required'),
    is_wasl: Yup.boolean().nullable(),
    password_confirmation: Yup.string().when('password', {
      is: password => !!password,
      then: Yup.string()
        .required(`${t('settings.customers.addEdit.password_confirmationRequired')}`)
        .oneOf([Yup.ref('password'), null], `${t('settings.customers.addEdit.password_confirmationMatch')}`)
    })
  })

  const formik = useFormik({
    initialValues: {
      first_name: current_driver?.first_name,
      last_name: current_driver.last_name,
      email: current_driver?.email,
      contact_number: '',
      password: '',
      password_confirmation: '',
      address: '',
      nationality: '',
      license_number: '',
      is_wasl: 0
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('first_name', values.first_name)
        data.append('last_name', values.last_name)
        data.append('email', values.email)
        data.append('contact_number', values.contact_number)
        data.append('password', values.password)
        data.append('address', values.address)
        data.append('nationality', values.nationality)
        data.append('license_number', values.license_number)

        dispatch(registerDriverAction({ data, callback: () => router.push('/admin-settings/customers') }))
      }
      console.log(data, ' data')
    }
  })

  useEffect(() => {
    return () => {
      // dispatch(resetCampus())
    }
  }, [])

  useEffect(() => {
    if (current_driver) {
      console.log('🚀 ~ file: add-edit-driver-form.js:124 ~ useEffect ~ current_driver:', current_driver)
      ;(formik.values.first_name = current_driver.first_name), (formik.values.last_name = current_driver.last_name)
    }
  }, [current_driver])

  return (
    <>
      <AddEditDriverHeader loading={loading} router={router} submitHandler={formik.handleSubmit} />

      <AddEditDriverForm
        edit={id}
        slug={slug}
        formik={formik}
        router={router}
        location={location}
        customers={customers}
        inputValue={inputValue}
        currentLocation={currentLocation}
        onChangeHandler={onChangeHandler}
      />
    </>
  )
}

EditDriver.acl = {
  action: 'manage',
  subject: 'manage-driver-profile'
}

EditDriver.AuthGuard = true

export default EditDriver
