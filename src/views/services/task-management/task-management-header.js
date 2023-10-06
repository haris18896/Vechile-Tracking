import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { IconWrapper, PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Input, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { useCommonStyles } from 'src/styles/common'
import Image from 'next/image'
import { Required } from 'src/styles/pages/services/edit'

function TaskManagementHeader(props) {
  const { changeHandler, handleClose, handleOpen, customers, values, open, formik } = props
  const router = useRouter()
  const datepickerStyles = useDatepickerStyles()
  const styles = useCommonStyles();


  // ========= Options =========

  const driverOptions = []

  const accountOptions = customers?.map((data, index) => {
    return {
      label: data.customer,
      value: data.id,
    }
  })

  const vehicleOptions = []

  // Destructuring values
  const { account, vehicle, driver, customer, date_from, date_to  } = values

  return (
    <ServicesWrapper>
      <Box sx={{ flex: 1 }}>
      <Grid container spacing={4} sx={{ alignItems: 'start' }}>

          <Grid item xs={12} sm={3}>
          <Grid container>
          <Grid item>
            <Title>Task Management List</Title>
          </Grid>
          </Grid>
          </Grid>

          <Grid item xs={12} sm={9}>
          <Grid container spacing={4}>

          <Grid item xs={6} sm={4} md={3}>
          <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(e, value) => changeHandler("account", value?.value) }
              value={account ? (accountOptions ? accountOptions.find(data => data.value === parseInt(account)) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'}, marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
          <Autocomplete
              fullWidth
              id='vehicle'
              name='vehicle'
              options={vehicleOptions || []}
              onChange={(e, value) => changeHandler("vehicle", value.value) }
              value={vehicle ? (vehicleOptions ? vehicleOptions.find(data => data.value === vehicle) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'}, marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Vehicle'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Autocomplete
              fullWidth
              id='driver'
              name='driver'
              options={driverOptions || []}
              onChange={(e, value) => changeHandler("driver", value.value) }
              value={driver? (driverOptions ? driverOptions.find(data => data.value === driver) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'}, marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Driver'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <TextField
              name='customer'
              id='outlined-basic'
              variant='outlined'
              placeholder='Customer Name'
              value={customer}
              onChange={e => changeHandler("customer", e.target.value) }
              className={styles.TextField}
            ></TextField>
          </Grid>

          <Grid item xs={6} sm={4} md={3} display="flex" alignItems={{ sm: "center" }} flexDirection={{ xs: 'column', sm: 'row'}}>
            <Typography variant='body' sx={{ fontWeight: '600' }}>
              From
            </Typography>
            <DatePickerWrapper sx={{ flex: 1, marginLeft: { sm: 2 }, width: '100%' }}>
              <DatePicker
                selected={date_from || ""}
                placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                className={datepickerStyles.datepicker}
                onChange={date => changeHandler("date_from", date)}
                dateFormat='yyyy-MM-dd'
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={6} sm={4} md={3} display="flex" alignItems={{ sm: "center" }} flexDirection={{ xs: 'column', sm: 'row'}}>
            <Typography variant='body' sx={{  fontWeight: '600' }} >
              To
            </Typography>
            <DatePickerWrapper sx={{ flex: 1, marginLeft: { sm: 2}, width: '100%'}}>
              <DatePicker
                selected={date_to || ""}
                placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                className={datepickerStyles.datepicker}
                onChange={date => changeHandler("date_to", date)}
                dateFormat='yyyy-MM-dd'
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item>
            <IconWrapper bg='#FF8B00' width='40px' height='40px' circle>
              <Icon icon='ic:round-search' width='22px' height='22px' color='#fff' />
            </IconWrapper>
          </Grid>

          <Grid item>
          <ButtonIcon
            sx={{ width: 100 }}
            color='success'
            startIcon={'ic:round-add'}
            onClick={() => router.push('/services/task-management/edit')}
          >
            Add
          </ButtonIcon>
          </Grid>

          <Grid item>
            <IconWrapper bg='#00ABBE' width='40px' height='40px' circle onClick={handleOpen} sx={{ "&.MuiBox-root:hover svg":{ color: '#00ABBE !important'} }}>
              <Icon icon='bi:cloud-arrow-up-fill' width='22px' height='22px' color='#fff' />
            </IconWrapper>
          </Grid>

          <Grid item>
          <ButtonIcon color='primary-outlined' startIcon={'ph:arrow-down-light'}>
            Download Sample
          </ButtonIcon>
          </Grid>

          </Grid>
          </Grid>

        </Grid>
        </Box>

        <AddFormDialog
        id='sim-Modal'
        title={<Box sx={{display:'flex',  justifyContent:'end'}}>
        <Button sx={{ padding: 0, justifyContent: 'end'}} onClick={handleClose}>
        <Icon icon="akar-icons:cross" color='#000' fontSize={20} fontWeight="600" />
        </Button></Box>}
        close={() => handleClose()}
        open={open}
        submit={() => formik.handleSubmit()}
        bg="#fff"
      >
        <form name='sim-register-form' onSubmit={formik.handleSubmit}>
          <Box>
                  <Box display="flex" flexDirection= "column" alignItems="center">
                  <Image alt={'upload-ic-2'} src="/images/icons/upload-ic.svg" width={100} height={100} />
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', color : '#556485'}}>File Upload</Typography>
                  </Box>

                  <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                    Account
                  </Typography>
                  <Autocomplete
                  fullWidth
                  id='account'
                  name='account'
                  options={accountOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('account', value?.value)
                  }}
                  value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.value === parseInt(formik.values.account) ) : '') : ''}
                  sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                  },
                  marginTop: 1 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Company'
                      error={formik.touched.account && Boolean(formik.errors.account)}
                      helperText={formik.touched.account && formik.errors.account}
                    />
                  )}


                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                    <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                    Vehicle Number
                  </Typography>
                  <Autocomplete
                  fullWidth
                  id='vehicle_no'
                  name='vehicle_no'
                  options={vehicleOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('vehicle_no', value?.value)
                  }}
                  value={formik.values.vehicle_no ? (vehicleOptions ? vehicleOptions.find(data => data.label === formik.values.vehicle_no ) : '') : ''}
                  sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.vehicle_no && formik.errors.vehicle_no && '#E53E3E !important'
                  },
                  marginTop: 1 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Vehicle'
                      error={formik.touched.vehicle_no && Boolean(formik.errors.vehicle_no)}
                      helperText={formik.touched.vehicle_no && formik.errors.vehicle_no}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                    <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                    Driver Name
                  </Typography>
                  <Autocomplete
                  fullWidth
                  id='driver'
                  name='driver'
                  options={driverOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('driver', value?.value)
                  }}
                  value={formik.values.driver ? (driverOptions ? driverOptions.find(data => data.label === formik.values.driver ) : '') : ''}
                  sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.driver && formik.errors.driver && '#E53E3E !important'
                  },
                  marginTop: 1 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Please Select Driver'
                      error={formik.touched.driver && Boolean(formik.errors.driver)}
                      helperText={formik.touched.driver && formik.errors.driver}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

                <Grid item xs={12}>

                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                  Excel File
                </TextLabel>

                <Grid item sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                <TextField
                  fullWidth
                  max={10}
                  id='file'
                  name='file'
                  type='text'
                  variant='outlined'
                  className={styles.TextField}
                  sx={{ flex: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                  placeholder="Please Select Excel File"
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                />
                <Button
                variant="contained"
                component="label"
                sx={{ background: '#FF8B00', borderRadius:'50px', flex: 0.3, boxShadow: 'none',
                    "&.MuiButtonBase-root:hover":{
                      backgroundColor: '#e57d00'
                    }
              }}
              >
                Browse
                <input
                  type="file"
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                  hidden
                />
              </Button>
              </Grid>

            </Grid>

              <Grid item xs={12}>
                <ButtonIcon color="success" sx={{ width: '100%'}} onClick={formik.handleSubmit}>Upload</ButtonIcon>
              </Grid>

            </Grid>
          </Box>
        </form>
      </AddFormDialog>

    </ServicesWrapper>
  )
}

export default TaskManagementHeader
