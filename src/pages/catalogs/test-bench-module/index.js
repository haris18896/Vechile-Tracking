import React, { Fragment, useState, useContext } from 'react'

// ** MUI
import { Box } from '@mui/system'

// ** Components
import TestBenchHeader from 'src/views/catalogs/test-bench/test-bench-header'
import TestBenchModule from 'src/views/catalogs/test-bench/test-bench-module'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Utils
import { isObjEmpty } from 'src/configs/utils'

function TestBench() {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()

  // ** States
  const [tabValue, setTabValue] = useState('1')
  const [imei, setImei] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'imei') setImei(value)
  }

  // const { loading } = useSelector(state => state.)

  // // **  List
  // useEffect(() => {

  // }, [])

  const handleLimitChange = e => {
    // dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    // dispatch(handlePageAction({ page: pg, limit }))
  }

  const schema = Yup.object().shape({
    imei: Yup.string()
      .required('IMEI is a required field')
      .max(100, 'The IMEI must not be greater than 100 characters.')
  })

  const testBenchFormik = useFormik({
    initialValues: {
      imei: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(testBenchFormik.errors)) {
        const data = new FormData()
        data.append('imei', values.imei)

        // dispatch(registerLiveLocationACtion({ data, router }))
      }
    }
  })

  const tabs = [
    {
      id: '1',
      label: 'Test Bench Module',
      content: <TestBenchModule formik={testBenchFormik} />
    }
  ]

  return (
    <>
      <TestBenchHeader
        tabs={tabs}
        tabValue={tabValue}
        formik={testBenchFormik}
        ability={ability}
        changeTab={(e, value) => setTabValue(value)}
        submitHandler={testBenchFormik.handleSubmit}
      />

      <Box sx={{ padding: 6 }}>
        {tabs.map((tab, index) => {
          return <Fragment key={index}>{tab.id === tabValue && tab.content}</Fragment>
        })}
      </Box>
    </>
  )
}

TestBench.acl = {
  action: 'manage',
  subject: 'manage-test-bench-module'
}

TestBench.AuthGuard = true

export default TestBench
