/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditZoneHeader from 'src/views/catalogs/zone/edit/add-edit-zone-header'
import AddEditZoneForm from 'src/views/catalogs/zone/edit/add-edit-zone-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Zone from "../index";

function AddZone() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field')
      .max(100, 'The name must not be greater than 100 characters.'),
    account: Yup.string().required('Account is required')
  })

  const AddZoneFormik = useFormik({
    initialValues: {
      name: '',
      account: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(AddZoneFormik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('capacity', values.capacity)

        // dispatch(registerZoneAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditZoneHeader
        loading={false}
        router={router}
        formik={AddZoneFormik}
        submitHandler={AddZoneFormik.handleSubmit}
      />

      <AddEditZoneForm router={router} formik={AddZoneFormik} />
    </>
  )
}

AddZone.acl = {
  action: 'manage',
  subject: 'manage-zone'
}

AddZone.AuthGuard = true

export default AddZone
