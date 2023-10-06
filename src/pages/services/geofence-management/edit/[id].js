/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditGeofenceHeader from 'src/views/services/geofence-management/edit/add-edit-geofence-header'
import AddEditGeofenceForm from 'src/views/services/geofence-management/edit/add-edit-geofence-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import AddGeofence from './add'

function EditGeofence() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lat: Yup.string().required('Latitude is required'),
    lng: Yup.string().required('Longitude is required')
  })

  const EditGeofenceFormik = useFormik({
    initialValues: {
      name: '',
      lat: '',
      lng: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(EditGeofenceFormik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('lat', values.lat)
        data.append('lng', values.lng)

        // dispatch(updateGeofenceAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditGeofenceHeader
        loading={false}
        router={router}
        title='Edit Geofence'
        submitHandler={EditGeofenceFormik.handleSubmit}
      />

      <AddEditGeofenceForm router={router} formik={EditGeofenceFormik} />
    </>
  )
}

EditGeofence.acl = {
  action: 'manage',
  subject: 'manage-geofence-management'
}

EditGeofence.AuthGuard = true

export default EditGeofence
