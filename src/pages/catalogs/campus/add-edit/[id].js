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

function EditCampus() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, getCampus } = useSelector(state => state.campus)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)

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
    name: Yup.string().required('Name is required'),
    lat: Yup.number().required('Latitude is required, select your location on the map'),
    lng: Yup.number().required('Longitude is required, select your location on the map'),
    address: Yup.string().required('Address is required'),
    country_id: Yup.number().required('Country is required'),
    state_id: Yup.number().required('State is required'),
    city_id: Yup.number().required('City is required'),
    customer_id: Yup.number().required('Customer is required')
  })

  const formik = useFormik({
    initialValues: {
      name: getCampus?.data?.name || '',
      lat: location?.lat || getCampus?.data?.lat,
      lng: location?.lng || getCampus?.data?.lng,
      address: getCampus?.data?.address || '',
      state_id: getCampus?.data?.state_id || '',
      city_id: getCampus?.data?.city_id || '',
      country_id: getCampus?.data?.country_id || '',
      customer_id: customer_id || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('lat', location.lat)
        data.append('lng', location.lng)
        data.append('address', values.address)
        data.append('state_id', values.state_id)
        data.append('city_id', values.city_id)
        data.append('country_id', values.country_id)
        data.append('customer_id', values.customer_id)

        dispatch(updateCampusAction({ id, data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetCampus())
    }
  }, [])

  return (
    <>
      <AddEditCampusHeader loading={loading} router={router} submitHandler={formik.handleSubmit} />

      <AddEditCampusForm
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

EditCampus.acl = {
  action: 'manage',
  subject: 'manage-campus'
}

export default EditCampus
