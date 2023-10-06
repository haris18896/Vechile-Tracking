/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditFuelCalibrationHeader from 'src/views/catalogs/fuel-calibration/edit/add-edit-fuel-calibration-header'
import AddEditFuelCalibrationForm from 'src/views/catalogs/fuel-calibration/edit/add-edit-fuel-calibration-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import AddEditFuelCalibrationTable from 'src/views/catalogs/fuel-calibration/edit/add-edit-fuel-table'
import { Catalog } from 'src/styles/pages/catalogs'
import FuelCalibration from '../index'

function AddFuelCalibration() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field')
      .max(100, 'The name must not be greater than 10 characters.'),
    capacity: Yup.number().required('Capacity is a required field')
  })

  const addFuelCalibrationFormik = useFormik({
    initialValues: {
      name: '',
      capacity: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(addFuelCalibrationFormik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('capacity', values.capacity)

        // dispatch(registerFuelCalibrationAction({ data, router }))
      }
    }
  })

  return (
    <Catalog>
      <AddEditFuelCalibrationHeader
        loading={false}
        router={router}
        formik={addFuelCalibrationFormik}
        submitHandler={addFuelCalibrationFormik.handleSubmit}
      />

      <AddEditFuelCalibrationForm router={router} formik={addFuelCalibrationFormik} />

      <AddEditFuelCalibrationTable formik={addFuelCalibrationFormik} />
    </Catalog>
  )
}

AddFuelCalibration.acl = {
  action: 'manage',
  subject: 'manage-fuel-calibration'
}

AddFuelCalibration.AuthGuard = true

export default AddFuelCalibration
