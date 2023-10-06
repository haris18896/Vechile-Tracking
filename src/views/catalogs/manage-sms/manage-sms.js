import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import { Select, TextField, MenuItem, Checkbox, Grid, FormGroup, FormControlLabel, Autocomplete, Typography } from '@mui/material'

// ** Custom Components
import { PlaceholderText, useCommonStyles } from 'src/styles/common'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'
import { Box } from '@mui/system'

function ManageSMSModule({ formik }) {
  const common = useCommonStyles()

  const accounts = [
    { name: 'Account 1' },
    { name: 'Account 2' },
    { name: 'Account 3' },
    { name: 'Account 4' },
    { name: 'Account 5' }
  ]

  const smsOptions = [
    { name: 'SMS Gateway 1' },
    { name: 'SMS Gateway 2' },
    { name: 'SMS Gateway 3' },
    { name: 'SMS Gateway 4' },
    { name: 'SMS Gateway 5' }
  ]

  const assetOptions = [
    { name: 'Asset 1' },
    { name: 'Asset 2' },
    { name: 'Asset 3' },
    { name: 'Asset 4' },
    { name: 'Asset 5' }
  ]


  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} sm={8}>
                <FieldWrapper>
                  <TextLabel id='sms-name' sx={{ marginBottom: '0.25rem' }}>
                    Send To
                  </TextLabel>

                  <FieldHorizontalWrapper>
                    <FormGroup sx={{ marginRight: 6 }}>
                      <FormControlLabel
                  
                        control={
                          <Checkbox
                            id='vehicles'
                            name='vehicles'
                            type='checkbox'
                            sx={{ padding: 0, marginRight: 3 }}
                            checked={formik.values.vehicles == true}
                            onClick={() => {
                              formik.setFieldValue('vehicles', !formik.values.vehicles)
                              formik.setFieldValue('others', formik.values.vehicles )
                            }}
                            className={common.Checkbox}
                            {...formik.getFieldProps('vehicles')}
                            error={formik.touched.vehicles && Boolean(formik.errors.vehicles)}
                            helperText={formik.touched.vehicles && formik.errors.vehicles}
                          />
                        }
                        label={<Typography sx={{ fontWeight: '500', textAlign: 'center' }}>Vehicles</Typography>}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id='others'
                            name='others'
                            type='checkbox'
                            sx={{ padding: 0, marginRight: 3 }}
                            onClick={() => {
                              formik.setFieldValue('others', !formik.values.others)
                              formik.setFieldValue('vehicles', formik.values.others)
                            }}
                            checked={formik.values.others == true}
                            {...formik.getFieldProps('others')}
                            className={common.Checkbox}
                            error={formik.touched.others && Boolean(formik.errors.others)}
                            helperText={formik.touched.others && formik.errors.others}
                          />
                        }
                        label={<Typography sx={{ fontWeight: '500', textAlign: 'center' }}>Others</Typography>}
                      />
                    </FormGroup>
                  </FieldHorizontalWrapper>
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='mobile-number' sx={{ marginBottom: '0.25rem' }}>
                    Mobile No. <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='mobileNo'
                    name='mobileNo'
                    variant='outlined'
                    {...formik.getFieldProps('mobileNo')}
                    className={common.TextField}
                    placeholder='Enter Mobile No.'
                    error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                    helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} md={8}>
                  <TextLabel id='Account' sx={{ marginBottom: '0.25rem' }}>
                    Account
                  </TextLabel>

                  <Autocomplete
                    fullWidth
                    displayEmpty
                    id='account'
                    name='account'
                    variant='outlined'
                    options={accounts || []}
                    getOptionLabel={option => option.name}
                    className={common.AutoCompleteSelect}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                      }
                    }}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('account', event.target.value)
                    }}
                    value={accounts.find(account => account.name === formik.values.account)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select account'
                        error={formik.touched.account && Boolean(formik.errors.account)}
                        helperText={formik.touched.account && formik.errors.account}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>


            

            <Grid item xs={12} md={6}>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} md={8}>
                  <FieldWrapper>
                    <TextLabel id='sms-gateway' sx={{ marginBottom: '0.25rem' }}>
                      SMS Gateway <span style={{ color: 'red' }}>*</span>
                    </TextLabel>

                    <Autocomplete
                      fullWidth
                      displayEmpty
                      id='smsGateway'
                      name='smsGateway'
                      variant='outlined'
                      options={smsOptions || []}
                      getOptionLabel={option => option.name}
                      className={common.AutoCompleteSelect}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: formik.touched.smsGateway && formik.errors.smsGateway && '#E53E3E !important'
                        }
                      }}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('smsGateway', event.target.value)
                      }}
                      value={smsOptions.find(sms => sms.name === formik.values.smsGateway)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='outlined'
                          placeholder='Select SMS Gateway'
                          error={formik.touched.smsGateway && Boolean(formik.errors.smsGateway)}
                          helperText={formik.touched.smsGateway && formik.errors.smsGateway}
                        />
                      )}
                    />
                  </FieldWrapper>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12} md={6}>
              <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={10} sm={11} md={8}>
                  <FieldWrapper>
                    <TextLabel id='asset-name' sx={{ marginBottom: '0.25rem' }}>
                      Asset Name
                    </TextLabel>

                    <Autocomplete
                      fullWidth
                      displayEmpty
                      id='assetName'
                      name='assetName'
                      variant='outlined'
                      options={assetOptions || []}
                      getOptionLabel={option => option.name}
                      className={common.AutoCompleteSelect}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: formik.touched.assetName && formik.errors.assetName && '#E53E3E !important'
                        }
                      }}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('assetName', event.target.value)
                      }}
                      value={assetOptions.find(assetName => assetName.name === formik.values.assetName)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='outlined'
                          placeholder='Select Asset'
                          error={formik.touched.assetName && Boolean(formik.errors.assetName)}
                          helperText={formik.touched.assetName && formik.errors.assetName}
                        />
                      )}
                    />
                  </FieldWrapper>
                </Grid>

                <Grid item xs={1} sm={1} md={2} sx={{ paddingLeft: { xs: 2, md: 4 } }} mt={5}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='allSms'
                          name='allSms'
                          type='checkbox'
                          checked={formik.values.allSms == true}
                          {...formik.getFieldProps('allSms')}
                          error={formik.touched.allSms && Boolean(formik.errors.allSms)}
                          helperText={formik.touched.allSms && formik.errors.allSms}
                        />
                      }
                      label={<Typography sx={{ fontWeight: '500', textAlign: 'center' }}>All</Typography>}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>

            

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='sms-template' sx={{ marginBottom: '0.25rem' }}>
                    SMS Message
                  </TextLabel>
                  <TextField
                    fullWidth
                    id='smsMessage'
                    name='smsMessage'
                    variant='outlined'
                    multiline
                    rows={4}
                    className={common.TextArea}
                    {...formik.getFieldProps('smsMessage')}
                    error={formik.touched.smsMessage && Boolean(formik.errors.smsMessage)}
                    helperText={formik.touched.smsMessage && formik.errors.smsMessage}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </SettingsWrapper>
  )
}

export default ManageSMSModule

ManageSMSModule.propTypes = {
  formik: PropTypes.object.isRequired
}
