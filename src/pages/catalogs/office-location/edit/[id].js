/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditOfficeLocationHeader from 'src/views/catalogs/office-location/edit/add-edit-office-location-header'
import AddEditOfficeLocationForm from 'src/views/catalogs/office-location/edit/add-edit-office-location-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { Catalog } from 'src/styles/pages/catalogs'
import AddOfficeLocation from './add'

function EditOfficeLocation() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const schema = Yup.object().shape({
    account: Yup.string().required('Account is a required field'),
    contactPersonName: Yup.string().required('Contact person name is a required field'),
    officeName: Yup.string().required('Office name is a required field'),
    contactPersonEmail: Yup.string().required('Contact person email is a required field'),
    officeType: Yup.string().required('Office type is a required field'),
    officeLocation: Yup.string().required('Office location is a required field')
  })

  const officeLocationFormik = useFormik({
    initialValues: {
      account: '',
      contactPersonName: '',
      officeName: '',
      contactPersonEmail: '',
      officeType: '',
      officeLocation: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(officeLocationFormik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('capacity', values.capacity)

        // dispatch(registerFuelCalibrationAction({ data, router }))
      }
    }
  })

  return (
    <Catalog>
      <AddEditOfficeLocationHeader
        loading={false}
        router={router}
        formik={officeLocationFormik}
        submitHandler={officeLocationFormik.handleSubmit}
      />

      <AddEditOfficeLocationForm router={router} formik={officeLocationFormik} />
    </Catalog>
  )
}

EditOfficeLocation.acl = {
  action: 'manage',
  subject: 'manage-office-location'
}

EditOfficeLocation.AuthGuard = true

export default EditOfficeLocation
