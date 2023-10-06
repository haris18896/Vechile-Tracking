import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Components
import AddEditSimHeader from 'src/views/catalogs/sim-listing/edit/add-or-edit-header'
import SimForm from 'src/views/catalogs/sim-listing/edit/sim-form'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Catalog } from 'src/styles/pages/catalogs'
import { getSimListingByIdAction, updateSimListingAction } from 'src/store/catalogs/sim-listing/simListingAction'
import { useDispatch, useSelector } from 'react-redux'

function EditSim() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const { getSimListing, loading } = useSelector(state => state.simListing)

  const editSimValidation = Yup.object().shape({
    sim_no: Yup.string().required('Sim No. is required'),
    serial_no: Yup.string().required('Serial No. is required'),
    service_provider: Yup.string().required('Service Provider is required'),
    asset_id: Yup.string().required('Asset Id is required')
  })

  const editSimFormik = useFormik({
    initialValues: {
      sim_no: getSimListing?.data?.sim_no,
      serial_no: getSimListing?.data?.serial_no,
      service_provider: getSimListing?.data?.service_provider,
      asset_id: getSimListing?.data?.asset_id
    },
    validationSchema: editSimValidation,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(editSimFormik.errors)) {
        const data = new FormData()
        data.append('sim_no', values.sim_no)
        data.append('serial_no', values.serial_no)
        data.append('service_provider', values.service_provider)
        data.append('asset_id', values.asset_id)
        dispatch(
          updateSimListingAction({
            data,
            callBack: () => {
              router.back()
              resetForm()
            }
          })
        )
        setSubmitting(false)

        console.log('values :', values)
      }
    }
  })
  useEffect(() => {
    dispatch(getSimListingByIdAction(id))
  }, [id])

  return (
    <Catalog>
      <AddEditSimHeader router={router} submitHandler={() => editSimFormik.handleSubmit()} />

      <SimForm formik={editSimFormik} />
    </Catalog>
  )
}

EditSim.acl = {
  action: 'manage',
  subject: 'manage-sim-list'
}

export default EditSim
