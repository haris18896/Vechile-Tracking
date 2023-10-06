import React from 'react'
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditGeofenceHeader from 'src/views/services/geofence-management/edit/add-edit-geofence-header'
import AssignVehiclesForm from 'src/views/services/geofence-management/assign-vehicles-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Services from "./index";

function AssignVehicle() {
  const router = useRouter()
  const dispatch = useDispatch()


  const schema = Yup.object().shape({
    selectedVehicles: Yup.array().required('Please select at least one vehicle'),
    assignedVehicles: Yup.array().required('Please select at least one vehicle'),
    allVehicles: Yup.bool(),

  })

  const AssignVehicleFormik = useFormik({
    initialValues: {
      selectedVehicles: [
        { id: 1, label: '3575 VAB', value: '3575', checked: false, },
        { id: 2, label: '3576 VAB', value: '3576', checked: false, },
        { id: 3, label: '3577 VAB', value: '3577', checked: false,},
        { id: 4, label: '3578 VAB', value: '3578',  checked: false,}
      ],
      assignedVehicles: [
        { id: 1, label: '3575 VAB', value: '3575', checked: false },
        { id: 2, label: '3576 VAB', value: '3576', checked: false }
      ],

      allVehicles: false,
      allAssignedVehicles: false,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(AssignVehicleFormik.errors)) {
        const data = new FormData()
        data.append('selectedVehicles', values.selectedVehicles)
        data.append('assignedVehicles', values.assignedVehicles)

        console.log('values', values)

        // dispatch(AssignVehiclesActions({ data, router }))
      }
    }
  })

  return (
    <>
      <AddEditGeofenceHeader
        loading={false}
        router={router}
        title='Assign Vehicles'
        submitHandler={AssignVehicleFormik.handleSubmit}
      />

      <AssignVehiclesForm formik={AssignVehicleFormik} />
    </>
  )
}

AssignVehicle.acl = {
  action: 'manage',
  subject: 'manage-geofence-management'
}

AssignVehicle.AuthGuard = true

export default AssignVehicle
