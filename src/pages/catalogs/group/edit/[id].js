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
import { useDispatch, useSelector } from 'react-redux'
import { getGroupByIdAction, updateGroupAction } from 'src/store/catalogs/group/groupAction'
import AddGroup from "./add";

function EditGroup() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const { loading, getAllGroupList } = useSelector(state => state.group)

  const data = getAllGroupList?.data
  const total = getAllGroupList?.total
  const limit = getAllGroupList?.limit
  const page = getAllGroupList?.page

  useEffect(() => {
    dispatch(getGroupByIdAction({ id }))
  }, [])

  console.log('check data ==>', data)

  const schema = Yup.object().shape({
    account: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Account is a required field'),
    searchAsset: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Search asset is a required field'),
    deviceGroup: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Device group is a required field')
  })

  const groupFormik = useFormik({
    initialValues: {
      account: '',
      searchAsset: '',
      deviceGroup: '',
      company_vehicles: false,
      group_vehicles: false,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(groupFormik.errors)) {
        const data = new FormData()
        data.append('account', values.account)
        data.append('searchAsset', values.searchAsset)
        data.append('deviceGroup', values.deviceGroup)
        data.append('companyVehicles', values.company_vehicles)
        data.append('groupVehicles', values.group_vehicles)
        dispatch(updateGroupAction({ id, data }))
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

EditGroup.acl = {
  action: 'manage',
  subject: 'manage-group'
}

EditGroup.AuthGuard = true

export default EditGroup
