/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import AddEditZoneHeader from 'src/views/catalogs/zone/edit/add-edit-zone-header'
import AddEditZoneForm from 'src/views/catalogs/zone/edit/add-edit-zone-form'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerZoneAction } from 'src/store/catalogs/zone/zoneActions'

function EditZone() {
  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  const { t } = useTranslation()

  // const schema = Yup.object().shape({
  //   name: Yup.string()
  //     .required(`${t('geofence.nameRequired')}`)
  //     .max(100, `${t('geofence.nameLength')}`)
  // })

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      console.log('Hello', values)
      const data = new FormData()
      data.append('name', values.name)
      dispatch(
        registerZoneAction({
          data
        })
      )
    }
  })

  return (
    <>
      <AddEditZoneHeader loading={false} router={router} formik={formik} />

      <AddEditZoneForm router={router} formik={formik} />
    </>
  )
}

EditZone.acl = {
  action: 'manage',
  subject: 'manage-zone'
}

EditZone.AuthGuard = true

export default EditZone
