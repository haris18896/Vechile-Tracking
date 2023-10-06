/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditWorkingHoursForm from 'src/views/catalogs/working-hours/edit/add-edit-working-hours-form'
import AddEditWorkingHoursHeader from 'src/views/catalogs/working-hours/edit/add-edit-working-hours-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

function EditWorkingHours() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const schema = Yup.object().shape({
    account: Yup.string()
      .required('Account is a required field')
      .max(100, 'The name must not be greater than 100 characters.'),
    startTime: Yup.string().required('Start time is a required field'),
    endTime: Yup.string().required('End time is a required field'),
    shiftName: Yup.string()
      .required('Shift name is a required field')
      .max(100, 'The name must not be greater than 100 characters.'),
    assignAsset: Yup.string()
      .required('Assign Asset is a required field')
      .max(100, 'The name must not be greater than 100 characters.'),
    allAssets: Yup.boolean()
  })

  const workingHoursFormik = useFormik({
    initialValues: {
      account: '',
      startTime: '',
      endTime: '',
      shiftName: '',
      assignAsset: '',
      allAssets: false
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(workingHoursFormik.errors)) {
        const data = new FormData()
        data.append('account', values.account)
        data.append('startTime', values.startTime)
        data.append('endTime', values.endTime)
        data.append('shiftName', values.shiftName)
        data.append('assignAsset', values.assignAsset)
        data.append('allAssets', values.allAssets)

        // dispatch(registerWorkingHoursAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditWorkingHoursHeader
        loading={false}
        router={router}
        formik={workingHoursFormik}
        submitHandler={workingHoursFormik.handleSubmit}
      />

      <AddEditWorkingHoursForm router={router} formik={workingHoursFormik} />
    </>
  )
}

export default EditWorkingHours
