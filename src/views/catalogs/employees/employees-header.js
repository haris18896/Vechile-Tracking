import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { PlaceholderText, SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper, SelectInput } from 'src/styles/components/input'

import { CatalogsWrapper } from 'src/styles/pages/catalogs'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { IconWrapper } from 'src/styles/pages/catalogs'
import { Icon } from '@iconify/react'
import { Box } from '@mui/system'
import { Autocomplete, Button, TextField, Typography } from '@mui/material'
import Image from 'next/image'

function EmployeesHeader({ slug, onChangeHandler, bus, account, mobile, name, tag, ability, router }) {
  const common = useCommonStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({
    account: Yup.string().required('Account is required'),
    asset_no: Yup.string().required('Asset No. is required'),
    file: Yup.string().required('Excel File is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      account: '',
      asset_no: '',
      file: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  const accountList = [
    {
      id: 1,
      label: 'account 1'
    },
    {
      id: 2,
      label: 'account 2'
    }
  ]

  const assetOptions = [
    {
      id: 1,
      label: 'asset 1'
    },
    {
      id: 2,
      label: 'asset 2'
    }
  ]

  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} xs={{ alignItems: 'center' }}>
          <Grid item md={2}>
            <Title>Employees List</Title>
          </Grid>

          <Grid item md={6} display='flex' flexWrap='wrap' marginLeft='auto'>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={e => onChangeHandler('name', e.target.value)}
                    className={common.TextField}
                  />
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    name='mobile'
                    value={mobile}
                    placeholder='Mobile No.'
                    onChange={e => onChangeHandler('mobile', e.target.value)}
                    className={common.TextField}
                  />
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    name='tag'
                    value={tag}
                    placeholder='Tag ID'
                    onChange={e => onChangeHandler('tag', e.target.value)}
                    className={common.TextField}
                  />
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    name='bus'
                    value={bus}
                    placeholder='Bus No.'
                    onChange={e => onChangeHandler('bus', e.target.value)}
                    className={common.TextField}
                  />
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FieldHorizontalWrapper xs={{ display: 'flex' }}>
                  <SelectInput
                    fullWidth
                    displayEmpty
                    value={account}
                    placeholder='Select Account'
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={e => onChangeHandler('account', e.target.value)}
                    className={common.Select}
                  >
                    <MenuItem value=''>
                      <PlaceholderText>Select Account</PlaceholderText>
                    </MenuItem>
                    <MenuItem value='1'>Account 1</MenuItem>
                    <MenuItem value='2'>Account 2</MenuItem>
                    <MenuItem value='3'>Account 3</MenuItem>
                  </SelectInput>
                </FieldHorizontalWrapper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={2} flexWrap='wrap'>
              {ability.can('create', 'create-employee') && (
                <Grid item>
                  <ButtonIcon
                    color='primary-outlined'
                    sx={{ width: 120 }}
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push('employees/edit/add')}
                  >
                    Add
                  </ButtonIcon>
                </Grid>
              )}

              <Grid item>
                <IconWrapper bg='#FF8B00' iconColor='#fff' width='35px' height='35px' circle>
                  <Icon icon='ic:round-search' width='22px' height='22px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <IconWrapper bg='#00ABBE' iconColor='#fff' width='35px' height='35px' circle onClick={handleOpen}>
                  <Icon icon='material-symbols:cloud-upload' width='22px' height='22px' />
                </IconWrapper>
              </Grid>

              <Grid item>
                <ButtonIcon
                  color='success-outlined'
                  startIcon={'tabler:arrow-narrow-down'}
                  // sx={{ width: 100 }}
                  // onClick={() => router.push('/catalogs/sim-list/add-or-edit/add')}
                >
                  Download Sample
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <AddFormDialog
        id='sim-Modal'
        title={
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button sx={{ padding: 0, justifyContent: 'end' }} onClick={handleClose}>
              <Icon icon='akar-icons:cross' color='#000' fontSize={20} fontWeight='600' />
            </Button>
          </Box>
        }
        close={() => handleClose()}
        open={open}
        submit={() => formik.handleSubmit()}
        bg='#fff'
      >
        <form name='sim-register-form' onSubmit={formik.handleSubmit}>
          <Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Image alt={'upload-ic'} src='/images/icons/upload-ic.svg' width={100} height={100} />
              <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', color: '#556485' }}>File Upload</Typography>
            </Box>

            <Grid item mb={3}>
              <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                Account
              </TextLabel>
              <Autocomplete
                fullWidth
                id='account'
                name='account'
                options={accountList || []}
                onChange={(e, value) => {
                  formik.setFieldValue('account', value?.value)
                }}
                value={
                  formik.values.account
                    ? accountList
                      ? accountList.find(account => account.value === parseInt(formik.values.account))
                      : ''
                    : ''
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Company'
                    error={formik.touched.account && Boolean(formik.errors.account)}
                    helperText={formik.touched.account && formik.errors.account}
                  />
                )}
                className={common.AutoCompleteSelect}
              />
            </Grid>

            <Grid item mb={3}>
              <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                Asset No.
              </TextLabel>
              <Autocomplete
                fullWidth
                id='asset_no'
                name='asset_no'
                options={assetOptions || []}
                onChange={(e, value) => {
                  formik.setFieldValue('asset_no', value?.value)
                }}
                value={
                  formik.values.asset_no
                    ? assetOptions
                      ? assetOptions.find(asset => asset.value === parseInt(formik.values.asset_no))
                      : ''
                    : ''
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.asset_no && formik.errors.asset_no && '#E53E3E !important'
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Vehicle'
                    error={formik.touched.asset_no && Boolean(formik.errors.asset_no)}
                    helperText={formik.touched.asset_no && formik.errors.asset_no}
                  />
                )}
                className={common.AutoCompleteSelect}
              />
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>Excel File</TextLabel>

                <Grid item sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    max={10}
                    id='file'
                    name='file'
                    type='text'
                    variant='outlined'
                    className={common.TextField}
                    sx={{ flex: 1 }}
                    InputProps={{
                      readOnly: true
                    }}
                    placeholder='Please Select Excel File'
                    {...formik.getFieldProps('file')}
                    error={formik.touched.file && Boolean(formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                  />
                  <Button
                    variant='contained'
                    component='label'
                    sx={{
                      background: '#FF8B00',
                      borderRadius: '50px',
                      flex: 0.3,
                      boxShadow: 'none',
                      '&.MuiButtonBase-root:hover': {
                        backgroundColor: '#e57d00'
                      }
                    }}
                  >
                    Browse
                    <input
                      type='file'
                      {...formik.getFieldProps('file')}
                      error={formik.touched.file && Boolean(formik.errors.file)}
                      helperText={formik.touched.file && formik.errors.file}
                      hidden
                    />
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <ButtonIcon color='success' sx={{ width: '100%' }} onClick={formik.handleSubmit}>
                  Upload
                </ButtonIcon>
              </Grid>
            </Grid>
          </Box>
        </form>
      </AddFormDialog>
    </CatalogsWrapper>
  )
}

export default EmployeesHeader

EmployeesHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
