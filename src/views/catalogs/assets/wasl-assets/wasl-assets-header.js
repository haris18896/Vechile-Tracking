import React, { useState } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'
import { Autocomplete, Box, Typography } from '@mui/material'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import SelectAutoComplete from 'src/components/autocomplete-selector'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Utils && hooks
import { isObjEmpty } from 'src/configs/utils'

// ** Styles
import { CatalogsWrapper, IconWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper, TextInput, FieldWrapper, TextLabel } from 'src/styles/components/input'
import { MenuItem, Select, TextField } from '@mui/material'
import { PlaceholderText } from 'src/styles/common'
import { Icon } from '@iconify/react'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllWASLAssetAction,
  registerWASLAssetAction,
  updateWaslAssetAction
} from 'src/store/catalogs/assets/assetsActions'

function WaslAssetsHeader(props) {
  const {
    router,
    customers,
    slug,
    onChangeHandler,
    inputValue,
    customerId,
    redirectWasl,
    handleClose,
    handleOpen,
    open,
    ability,
    refresUserList,
    isUpdate,
    updateData
  } = props

  const dispatch = useDispatch()

  // ** Styles
  const common = useCustomStyles()

  // ** plate type id Selector
  const plateType = useSelector(state => state?.platType?.platTypes)

  // ** plate type List
  const plateTypeList = plateType?.map(plate => {
    return {
      value: plate.id,
      label: plate.name
    }
  })
  // ** Asset Selector
  const assets = useSelector(state => state?.assets?.getAllAssetList?.data)

  // ** Asset List
  const assetList = assets?.map(asset => {
    return {
      value: asset.id,
      label: asset.name
    }
  })

  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })
  const customStyles = useCustomStyles()
  const [value, setValue] = useState('')

  const selectOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  // ** Formik
  const schema = Yup.object().shape({
    asset_id: Yup.string().required('Asset is required'),
    plate_type_id: Yup.string().required('Type is required'),
    sequence_number: Yup.string().required('sequence number is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      asset_id: isUpdate ? updateData?.asset_id : '',
      plate_type_id: isUpdate ? updateData?.plate_type_id : '',
      sequence_number: isUpdate ? updateData?.sequence_number : '',
      imei_number: isUpdate ? updateData?.imei_number : '',
      plate_registration_no: isUpdate ? updateData?.plate_registration_no : ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        if (isUpdate) {
          let data = {
            ...values,
            customer_id: 2
          }

          dispatch(
            updateWaslAssetAction({
              id: updateData?.id,
              data: data,
              callback: () => {
                resetForm()
                handleClose()
              }
            })
          )
        } else {
          const data = new FormData()
          data.append('asset_id', values.asset_id)
          data.append('plate_type_id', values.plate_type_id)
          data.append('sequence_number', values.sequence_number)
          data.append('imei_number', values.imei_number)
          data.append('plate_registration_no', values.plate_registration_no)
          data.append('customer_id', 2)

          dispatch(
            registerWASLAssetAction({
              data,
              callBack: () => {
                handleClose()
                resetForm()
                dispatch(getAllWASLAssetAction({ page: 1, limit: 10 }))
              }
            })
          )
        }
      }
    }
  })

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  return (
    <CatalogsWrapper>
      <Grid container spacing={2} xs={{ alignItems: 'center' }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'start',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          <Grid item md={2}>
            <Title>WASL Assets List</Title>
          </Grid>

          <Grid item md={6} display='flex' flexWrap='wrap'>
            <FieldHorizontalWrapper xs={{ display: 'flex' }}>
              <Select
                variant='outlined'
                displayEmpty
                value={value}
                name='trackVal'
                onChange={e => setValue(e.target.value)}
                className={customStyles.Select}
              >
                {selectOptions?.map((data, index) =>
                  index === 0 ? (
                    <MenuItem key={index} value=''>
                      <PlaceholderText>Select Account</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={index} value={data.slug}>
                      {data.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper xs={{ display: 'flex' }}>
              <Select
                variant='outlined'
                displayEmpty
                value={value}
                name='trackVal'
                onChange={e => setValue(e.target.value)}
                className={customStyles.Select}
              >
                {selectOptions?.map((data, index) =>
                  index === 0 ? (
                    <MenuItem key={index} value=''>
                      <PlaceholderText>Asset Name</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={index} value={data.slug}>
                      {data.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Plate No'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Sequence Number'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Search EMEI'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>
          <Grid
            item
            md={4}
            display='flex'
            flexWrap='wrap'
            alignItems='flex-start'
            sx={{
              gap: '10px'
            }}
          >
            {ability.can('create', 'create-asset') && (
              <ButtonIcon
                color='primary-outlined'
                iconHeight={15}
                iconWidth={15}
                sx={{ width: 120 }}
                startIcon={'ic:round-arrow-back-ios-new'}
                onClick={() => redirectWasl(false)}
              >
                Back
              </ButtonIcon>
            )}
            <ButtonIcon sx={{ width: 120 }} color='success' startIcon={'ic:baseline-plus'} onClick={() => handleOpen()}>
              Register
            </ButtonIcon>

            <ButtonIcon
              color='primary-outlined'
              sx={{ width: 120 }}
              startIcon={'material-symbols:arrow-outward-rounded'}
              onClick={() => handleOpen()}
            >
              Export
            </ButtonIcon>
          </Grid>
        </Grid>
      </Grid>

      <AddFormDialog
        id='register-Modal'
        title='Register User'
        context='Enter user details to register new user'
        close={() => {
          handleClose()
          formik.resetForm()
        }}
        open={open}
        submit={() => formik.handleSubmit()}
        agree={isUpdate ? 'Update' : 'Register'}
        cancel='Cancel'
        bg='#fff'
        zIndex={99999}
      >
        <form name='add-user' onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FieldWrapper>
                <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                  Asset Id
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_id'
                  name='asset_id'
                  options={assetList ?? []}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => String(option.label)}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_id', value?.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                    }
                  }}
                  value={
                    assetList?.find(customer => customer.value === parseInt(formik.values.asset_id)) || null // Set to null or an initial value if no match is found
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset'
                      error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                      helperText={formik.touched.asset_id && formik.errors.asset_id}
                    />
                  )}
                  className={customStyles.AutoCompleteSelect}
                  inputProps={{
                    onKeyPress: handleKeyPress
                  }}
                />
              </FieldWrapper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FieldWrapper>
                <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                  Plate type Id
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='plate_type_id'
                  name='plate_type_id'
                  options={plateTypeList ?? []}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => String(option.label)}
                  onChange={(e, value) => {
                    formik.setFieldValue('plate_type_id', value?.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.plate_type_id && formik.errors.plate_type_id && '#E53E3E !important'
                    }
                  }}
                  value={
                    plateTypeList?.find(customer => customer.value === parseInt(formik.values.plate_type_id)) || null // Set to null or an initial value if no match is found
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select plate type'
                      error={formik.touched.plate_type_id && Boolean(formik.errors.plate_type_id)}
                      helperText={formik.touched.plate_type_id && formik.errors.plate_type_id}
                    />
                  )}
                  className={customStyles.AutoCompleteSelect}
                  inputProps={{
                    onKeyPress: handleKeyPress
                  }}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FieldWrapper>
                <TextLabel id='sequence_number' sx={{ marginBottom: '0.25rem' }}>
                  Sequence Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='sequence_number'
                  name='sequence_number'
                  type='sequence_number'
                  variant='outlined'
                  placeholder='Enter sequence number'
                  {...formik.getFieldProps('sequence_number')}
                  inputProps={{
                    onKeyPress: handleKeyPress
                  }}
                  className={common.TextField}
                  error={formik.touched.sequence_number && Boolean(formik.errors.sequence_number)}
                  helperText={formik.touched.sequence_number && formik.errors.sequence_number}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FieldWrapper>
                <TextLabel id='imei_number' sx={{ marginBottom: '0.25rem' }}>
                  IMEI Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='imei_number'
                  name='imei_number'
                  type='imei_number'
                  variant='outlined'
                  placeholder='Enter IMEI number'
                  {...formik.getFieldProps('imei_number')}
                  inputProps={{
                    onKeyPress: handleKeyPress
                  }}
                  className={common.TextField}
                  error={formik.touched.imei_number && Boolean(formik.errors.imei_number)}
                  helperText={formik.touched.imei_number && formik.errors.imei_number}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FieldWrapper>
                <TextLabel id='plate_registration_no' sx={{ marginBottom: '0.25rem' }}>
                  Registeration Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='plate_registration_no'
                  name='plate_registration_no'
                  type='plate_registration_no'
                  variant='outlined'
                  placeholder='Enter registration number'
                  {...formik.getFieldProps('plate_registration_no')}
                  inputProps={{
                    onKeyPress: handleKeyPress
                  }}
                  className={common.TextField}
                  error={formik.touched.plate_registration_no && Boolean(formik.errors.plate_registration_no)}
                  helperText={formik.touched.plate_registration_no && formik.errors.plate_registration_no}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </form>
      </AddFormDialog>
    </CatalogsWrapper>
  )
}

export default WaslAssetsHeader

WaslAssetsHeader.propTypes = {
  slug: PropTypes.object || PropTypes.string,
  customers: PropTypes.array,
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func
}
