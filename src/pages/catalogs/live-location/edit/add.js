/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditLiveLocationForm from 'src/views/catalogs/live-location/edit/add-edit-live-location-form'
import AddEditLiveLocationHeader from 'src/views/catalogs/live-location/edit/add-edit-live-location-header.js'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { Catalog } from 'src/styles/pages/catalogs'
import LiveLocation from "../index";

function AddLiveLocation() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const schema = Yup.object().shape({
    account: Yup.string()
      .required('Account is a required field')
      .max(100, 'The name must not be greater than 10 characters.'),
    asset: Yup.string()
      .required('Asset is a required field')
      .max(100, 'The name must not be greater than 10 characters.'),
    startDate: Yup.date(),
    endDate: Yup.date(),
    link: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
  })

  const addLiveLocationFormik = useFormik({
    initialValues: {
      account: '',
      asset: '',
      startDate: '',
      endDate: '',
      link: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(addLiveLocationFormik.errors)) {
        const data = new FormData()
        data.append('link', values.link)
        data.append('asset', values.asset)
        data.append('account', values.account)
        data.append('endDate', values.endDate)
        data.append('startDate', values.startDate)

        // dispatch(registerLiveLocationACtion({ data, router }))
      }
    }
  })

  return (
    <Catalog>
      <AddEditLiveLocationHeader
        loading={false}
        router={router}
        formik={addLiveLocationFormik}
        submitHandler={addLiveLocationFormik.handleSubmit}
      />

      <AddEditLiveLocationForm router={router} formik={addLiveLocationFormik} />
    </Catalog>
  )
}

AddLiveLocation.acl = {
  action: 'manage',
  subject: 'manage-live-location'
}

AddLiveLocation.AuthGuard = true

export default AddLiveLocation
