/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditEmployeesHeader from 'src/views/catalogs/employees/edit/add-edit-employees-header'
import AddEditEmployeesForm from 'src/views/catalogs/employees/edit/add-edit-employees-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Employees from "../index";

function AddEmployee() {
  const router = useRouter()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    account: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Account is a required field'),
    assetNo: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Asset No. is a required field'),
    type: Yup.string()
      .max(100, 'The name must not be greater than 100 characters.')
      .required('Type is a required field'),
    mobileNumber: Yup.number().required('Mobile number is a required field'),
    employeeName: Yup.string()
      .max(50, 'The name must not be greater than 50 characters.')
      .required('Employee name is a required field'),
    idNo: Yup.number().required('ID no. is a required field'),
    designation: Yup.string()
      .max(50, 'The name must not be greater than 50 characters.')
      .required('Designation is a required field'),
    bloodGroup: Yup.string()
      .max(3, 'The name must not be greater than 3 characters.')
      .required('Blood group is a required field'),
    department: Yup.string()
      .max(50, 'The name must not be greater than 50 characters.')
      .required('Department is a required field'),
    tagId: Yup.string()
      .max(50, 'The name must not be greater than 50 characters.')
      .required('Tag Id is a required field'),
    location: Yup.string()
      .max(50, 'The name must not be greater than 50 characters.')
      .required('Location is a required field'),
    photo: Yup.mixed().required('Photo is a required field'),
    pickUpTime: Yup.date(),
    dropOffTime: Yup.date(),
    comment: Yup.string().max(100, 'The name must not be greater than 100 characters.')
  })

  const employeeFormik = useFormik({
    initialValues: {
      account: '',
      assetNo: '',
      type: '',
      mobileNumber: '',
      employeeName: '',
      idNo: '',
      designation: '',
      bloodGroup: '',
      department: '',
      tagId: '',
      location: '',
      photo: '',
      pickUpTime: '',
      dropOffTime: '',
      comment: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(employeeFormik.errors)) {
        const data = new FormData()
        data.append('account', values.account)
        data.append('assetNo', values.assetNo)
        data.append('type', values.type)
        data.append('mobileNumber', values.mobileNumber)
        data.append('employeeName', values.employeeName)
        data.append('idNo', values.idNo)
        data.append('designation', values.designation)
        data.append('bloodGroup', values.bloodGroup)
        data.append('department', values.department)
        data.append('tagId', values.tagId)
        data.append('location', values.location)
        data.append('photo', values.photo)
        data.append('pickUpTime', values.pickUpTime)
        data.append('dropOffTime', values.dropOffTime)
        data.append('comment', values.comment)

        // dispatch(registerEmployeeAction({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditEmployeesHeader
        loading={false}
        router={router}
        formik={employeeFormik}
        submitHandler={employeeFormik.handleSubmit}
      />

      <AddEditEmployeesForm router={router} formik={employeeFormik} />
    </>
  )
}

AddEmployee.acl = {
  action: 'manage',
  subject: 'manage-employee'
}

AddEmployee.AuthGuard = true

export default AddEmployee
