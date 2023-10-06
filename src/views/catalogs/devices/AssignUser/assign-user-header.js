import React, { useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import CardSnippet from 'src/@core/components/card-snippet'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { FileUploaderWrapper, useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import FileUploaderRestrictions from 'src/components/FileUploader/file-uploader-restricted'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerDeviceAction } from 'src/store/catalogs/devices/devicesAction'
import { useRouter } from 'next/router'
import { IconWrapper } from 'src/styles/pages/catalogs'
import { Icon } from '@iconify/react'

function AssignUserHeader({ ability }) {
  const dispatch = useDispatch()
  const common = useCommonStyles()
  const router = useRouter()
  const {pathname} = router;

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const downloadTemplate = () => {
    const file = new Blob([deviceTemplate], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const fileURL = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = 'devices-template.xlsx'
    link.click()
  }

  // ** Form Validation
  const schema = Yup.object().shape({
    file: Yup.mixed()
      .required('A file is required')
      .test('fileFormat', 'XLSX only', value => {
        return value && ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(value.type)
      })
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      file: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('file', values.file)

        dispatch(registerDeviceAction({ file: data }))
        resetForm()
        handleClose()
      }
    }
  })
  console.log('values  : ', formik.values.file)

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>

        <Grid item xs={12} md>
          <Title>Assign User</Title>
        </Grid>

        {ability.can('create', 'create-devices') && (
          <>
          <Grid item>
          <ButtonIcon
          sx={{ width: 120 }}
          color='grey'
          iconWidth={20}
          iconHeight={15}
          startIcon={'ic:round-arrow-back-ios-new'}
          onClick={() => router.back()}
          >
          Back
          </ButtonIcon>
          </Grid>

          <Grid item>
          <ButtonIcon
            sx={{ width: 120 }}
            color='success'
            startIcon={'ic:round-add'}
            onClick={() => router.push(pathname + "/add" )}
          >
            Add
          </ButtonIcon>
          </Grid>
          </>
        )}
      </Grid>
      <AddFormDialog
        id='assets-types-Modal'
        title='Register Device'
        context='Click on the download button to download the template. Fill in the details and upload the file.'
        close={() => handleClose()}
        open={open}
        submit={() => {
          console.log('formik file ==>', formik?.values?.file)
          formik.handleSubmit()
        }}
        agree='Add'
        cancel='Cancel'
      >
        <form name='devices-name' onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ButtonIcon
                color='primary'
                startIcon={'ic:baseline-download'}
                href='/files/device_template.xlsx'
                download
              >
                Download Template
              </ButtonIcon>
            </Grid>

            <Grid item xs={12} md={12}>
              <FileUploaderWrapper>
                <FileUploaderRestrictions formik={formik} mb={2} allowed={'Allowed *.xlsx'} desc={'Max 1 files and max size of 2 MB'} heading={'Drop files here or click to upload.'} />
              </FileUploaderWrapper>
            </Grid>
          </Grid>
        </form>
      </AddFormDialog>
    </SettingsWrapper>
  )
}

export default AssignUserHeader

AssignUserHeader.propTypes = {
  customers: PropTypes.array,
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
