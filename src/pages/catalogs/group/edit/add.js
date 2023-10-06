/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditGroupHeader from 'src/views/catalogs/group/edit/add-edit-group-header'
import AddEditGroupForm from 'src/views/catalogs/group/edit/add-edit-group-form'

// ** Store & Actions
import { useDispatch } from 'react-redux'

function AddGroup() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    searchAsset: Yup.string()
      .required('Search asset is a required field')
      .max(100, 'Search asset must not be greater than 100 characters.'),
    vehicle_group: Yup.string()
      .required('Device group is a required field')
      .max(100, 'Device group must not be greater than 100 characters.')
  })

  const groupFormik = useFormik({
    initialValues: {
      searchAsset: '',
      vehicle_group: '',
      company_vehicles: false,
      group_vehicles: false
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(groupFormik.errors)) {
        const data = new FormData()
        data.append('searchAsset', values.searchAsset)
        data.append('vehicle_group', values.vehicle_group)
        data.append('companyVehicles', values.company_vehicles)
        data.append('groupVehicles', values.group_vehicles)
        dispatch(registerGroupAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditGroupHeader
        loading={false}
        router={router}
        formik={groupFormik}
        submitHandler={groupFormik.handleSubmit}
      />

      <AddEditGroupForm router={router} formik={groupFormik} />
    </>
  )
}

AddGroup.acl = {
  action: 'manage',
  subject: 'manage-group'
}

AddGroup.AuthGuard = true

export default AddGroup
