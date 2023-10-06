import React from 'react'

import { useRouter } from 'next/router'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Components
import AddEditSimHeader from 'src/views/catalogs/sim-listing/edit/add-or-edit-header'
import SimForm from 'src/views/catalogs/sim-listing/edit/sim-form'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { registerSimListingAction } from 'src/store/catalogs/sim-listing/simListingAction'

function AddSim() {
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  const addSimValidation = Yup.object().shape({
    // sim_no: Yup.string().required('Sim No. is required'),
    // serial_no: Yup.string().required('Serial No. is required'),
    // service_provider: Yup.string().required('Service Provider is required'),
    // asset_id: Yup.string().required('Asset Id is required')
  })

  const addSimFormik = useFormik({
    initialValues: {
      sim_no: '',
      serial_no: '',
      service_provider: '',
      asset_id: ''
    },
    validationSchema: addSimValidation,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(addSimFormik.errors)) {
        const data = {
          sim_no: values.sim_no,
          serial_no: values.serial_no,
          service_provider: values.service_provider,
          asset_id: values.asset_id
        }
        dispatch(
          registerSimListingAction({
            data,
            callback: () => {
              // router.back()
              resetForm()
            }
          })
        )
        router.push('/catalogs/sim-list')
        console.log('values :', data)
      }
    }
  })

  console.log(addSimFormik.errors, 'error')

  return (
    <>
      <AddEditSimHeader router={router} submitHandler={() => addSimFormik.handleSubmit()} />

      <SimForm formik={addSimFormik} />
    </>
  )
}

AddSim.acl = {
  action: 'manage',
  subject: 'manage-sim-list'
}

export default AddSim
