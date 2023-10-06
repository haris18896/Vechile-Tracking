/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditProfileHeader from 'src/views/catalogs/profile/edit/add-edit-header'
import AddEditProfileForm from 'src/views/catalogs/profile/edit/add-edit-profile-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { resetGetProfile, resetProfile } from 'src/store/catalogs/profile/profileSlice'
import { getProfileByIdAction, updateProfileAction } from 'src/store/catalogs/profile/profileAction'

function EditProfile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, getCampus } = useSelector(state => state.campus)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)
  const getProfile = useSelector(state => state.profile?.getProfile)

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
      dispatch(getProfileByIdAction({ id, customer_id }))
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
    city_id: Yup.number().required('City is required'),
    asset_id: Yup.number().required('Asset is required'),
    state_id: Yup.number().required('State is required'),
    country_id: Yup.number().required('Country is required'),
    last_name: Yup.string().required('Last name is required'),
    contact_number: Yup.string().required('Contact number is required'),
    customer_id: Yup.number().required('Customer is required'),
    first_name: Yup.string().required('First name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    lat: Yup.number().required('Latitude is required, select your location on the map'),
    lng: Yup.number().required('Longitude is required, select your location on the map')
  })

  const formik = useFormik({
    initialValues: {
      first_name: getProfile?.data?.first_name || '',
      last_name: getProfile?.data?.last_name || '',
      email: getProfile?.data?.email || '',
      contact_number: getProfile?.data?.contact_number || '',
      user_id: '',
      asset_id: '',
      lat: location.lat || getProfile?.data?.lat,
      lng: location.lng || getProfile?.data?.lng,
      state_id: '',
      city_id: '',
      country_id: '',
      customer_id: '',
      profile_type_id: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('lat', values.lat)
        data.append('lng', values.lng)
        data.append('email', values.email)
        data.append('city_id', values.city_id)
        data.append('asset_id', values.asset_id)
        data.append('state_id', values.state_id)
        data.append('last_name', values.last_name)
        data.append('first_name', values.first_name)
        data.append('country_id', values.country_id)
        data.append('customer_id', values.customer_id)
        data.append('contact_number', values.contact_number)

        dispatch(updateProfileAction({ id, data, callBack: () => router.back() }))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetProfile())
      dispatch(resetGetProfile())
    }
  }, [])

  console.log('getProfile', getProfile)
  console.log('formik values in edit profile', formik.values)

  return (
    <>
      <AddEditProfileHeader loading={loading} router={router} submitHandler={formik.handleSubmit} />

      <AddEditProfileForm
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

export default EditProfile
