import React, { Fragment, useState, useContext } from 'react'

// ** MUI
import { Box } from '@mui/system'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Components
import ManageSMSModule from 'src/views/catalogs/manage-sms/manage-sms'
import ManageSMSHeader from 'src/views/catalogs/manage-sms/manage-sms-header'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

function ManageSMS() {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()

  // ** States
  const [tabValue, setTabValue] = useState('1')

  const manageEmailValidation = Yup.object().shape({
    vehicles: Yup.boolean(),
    others: Yup.boolean(),
    smsBody: Yup.string(),
    assetName: Yup.string(),
    allAsset: Yup.boolean(),
    account: Yup.string(),
    mobileNo: Yup.string().required('Mobile No is required'),
    smsGateway: Yup.string().required('SMS Gateway is required'),
    smsMessage: Yup.string()
  })

  const emailFormik = useFormik({
    initialValues: {
      vehicles: false,
      others: false,
      mobileNo: '',
      smsBody: '',
      smsGateway: '',
      assetName: '',
      allSms: false,
      sms: '',
      account: '',
      smsMessage: ''
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
      label: 'Manage SMS',
      content: <ManageSMSModule formik={emailFormik} />
    }
  ]

  return (
    <>
      <ManageSMSHeader
        tabs={tabs}
        ability={ability}
        tabValue={tabValue}
        changeTab={(e, value) => setTabValue(value)}
        submitHandler={() => emailFormik.handleSubmit()}
      />

      <Box>
        {tabs.map((tab, index) => {
          return <Fragment key={index}>{tab.id === tabValue && tab.content}</Fragment>
        })}
      </Box>
    </>
  )
}

ManageSMS.acl = {
  action: 'manage',
  subject: 'manage-manage-sms'
}

ManageSMS.AuthGuard = true

export default ManageSMS
