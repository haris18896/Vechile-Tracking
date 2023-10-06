import React, { Fragment, useState, useContext } from 'react'

// ** MUI
import { Box } from '@mui/system'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import ManageEmailHeader from 'src/views/catalogs/manage-email/manage-email-header'
import ManageEmailModule from 'src/views/catalogs/manage-email/manage-email'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function ManageEmail() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()

  // ** States
  const [tabValue, setTabValue] = useState('1')

  const manageEmailValidation = Yup.object().shape({
    account: Yup.string().required('Account is required'),
    all: Yup.boolean(),
    subject: Yup.string().required('Subject is required'),
    emailId: Yup.string().required('Email Id is required'),
    emailBody: Yup.string()
  })

  const emailFormik = useFormik({
    initialValues: {
      account: '',
      all: false,
      subject: '',
      emailId: '',
      emailBody: ''
    },
    validationSchema: manageEmailValidation,
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
      label: 'Manage Email',
      content: <ManageEmailModule formik={emailFormik} />
    }
  ]

  return (
    <>
      <ManageEmailHeader
        tabs={tabs}
        tabValue={tabValue}
        ability={ability}
        changeTab={(e, value) => setTabValue(value)}
        submitHandler={() => emailFormik.handleSubmit()}
      />

      <Box sx={{ padding: 6 }}>
        {tabs.map((tab, index) => {
          return <Fragment key={index}>{tab.id === tabValue && tab.content}</Fragment>
        })}
      </Box>
    </>
  )
}

ManageEmail.acl = {
  action: 'manage',
  subject: 'manage-manage-email'
}

ManageEmail.AuthGuard = true

export default ManageEmail
