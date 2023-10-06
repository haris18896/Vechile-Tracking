import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI
import { Box } from '@mui/system'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components

import EditEmailTemplateHeader from 'src/views/catalogs/email-template/edit-email-template/edit-email-template-header'
import EditEmailTemplateForm from 'src/views/catalogs/email-template/edit-email-template/edit-email-template-form'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// dummy rows
import { dummyRows } from 'src/views/catalogs/email-template/table.data'
import EmailTemplate from '../index'

export default function EditEmailTemplate() {
  const dispatch = useDispatch()
  const router = useRouter()
  console.log('router :', router.query.id)

  // ** States
  const [tabValue, setTabValue] = useState('1')

  const editEmailTemplateValidation = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required')
  })

  const emailTemplateFormik = useFormik({
    initialValues: {
      type: '',
      subject: '',
      message: ''
    },
    validationSchema: editEmailTemplateValidation,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        console.log('values :', values)
        setSubmitting(false)
        resetForm()
      }
    }
  })

  const tabs = [
    {
      id: '1',
      label: 'Email Template',
      content: <EditEmailTemplateForm formik={emailTemplateFormik} />
    }
  ]

  return (
    <>
      <EditEmailTemplateHeader
        tabs={tabs}
        router={router}
        tabValue={tabValue}
        changeTab={(e, value) => setTabValue(value)}
        submitHandler={() => emailTemplateFormik.handleSubmit()}
      />

      <Box sx={{ padding: 6 }}>
        {tabs.map((tab, index) => {
          return <Fragment key={index}>{tab.id === tabValue && tab.content}</Fragment>
        })}
      </Box>
    </>
  )
}

EditEmailTemplate.acl = {
  action: 'manage',
  subject: 'manage-email-template'
}

EditEmailTemplate.AuthGuard = true
