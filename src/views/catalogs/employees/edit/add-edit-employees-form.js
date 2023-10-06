import React from 'react'

// ** MUI
import { Autocomplete, Box, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'

// ** Third Party Packages
import moment from 'moment'
import DatePicker from 'react-datepicker'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FieldHorizontalWrapper, FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCommonStyles } from 'src/styles/common'

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)'
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px !important'
  },
  '& .MuiInputLabel-outlined': {
    top: '-9px !important'
  }
}

const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const assets = [{ name: 'Asset 1' }, { name: 'Asset 2' }, { name: 'Asset 3' }, { name: 'Asset 4' }, { name: 'Asset 5' }]

const types = [{ name: 'Type 1' }, { name: 'Type 2' }, { name: 'Type 3' }, { name: 'Type 4' }, { name: 'Type 5' }]

function AddEditEmployeesForm({ router, formik }) {
  const datepickerStyles = useDatepickerStyles()
  const common = useCommonStyles()

  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='account-name' sx={{ marginBottom: '0.25rem' }}>
                    Account <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    id='account'
                    name='account'
                    options={accounts}
                    className={common.AutoCompleteSelect}
                    getOptionLabel={option => option.name}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('account', newValue.name)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                      }
                    }}
                    value={accounts.find(account => account.name === formik.values.account)}
                    error={formik.touched.account && Boolean(formik.errors.account)}
                    helperText={formik.touched.account && formik.errors.account}
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
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='asset-no-name' sx={{ marginBottom: '0.25rem' }}>
                    Asset No <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    id='assetNo'
                    name='assetNo'
                    options={assets}
                    className={common.AutoCompleteSelect}
                    getOptionLabel={option => option.name}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('assetNo', newValue.name)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.assetNo && formik.errors.assetNo && '#E53E3E !important'
                      }
                    }}
                    value={assets.find(asset => asset.name === formik.values.assetNo)}
                    error={formik.touched.assetNo && Boolean(formik.errors.assetNo)}
                    helperText={formik.touched.assetNo && formik.errors.assetNo}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Asset'
                        error={formik.touched.assetNo && Boolean(formik.errors.assetNo)}
                        helperText={formik.touched.assetNo && formik.errors.assetNo}
                      />
                    )}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='select-type-name' sx={{ marginBottom: '0.25rem' }}>
                    Select Type <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    id='type'
                    name='type'
                    options={types}
                    className={common.AutoCompleteSelect}
                    getOptionLabel={option => option.name}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('type', newValue.name)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.type && formik.errors.type && '#E53E3E !important'
                      }
                    }}
                    value={types.find(type => type.name === formik.values.type)}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select type'
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                      />
                    )}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <DatePickerWrapper>
                  <FieldWrapper>
                    <TextLabel id='mobile-number-name' sx={{ marginBottom: '0.25rem' }}>
                      Mobile Number <span style={{ color: 'red' }}>*</span>
                    </TextLabel>
                    <TextInput
                      fullWidth
                      id='mobileNumber'
                      name='mobileNumber'
                      type='number'
                      variant='outlined'
                      placeholder='Enter mobile number'
                      {...formik.getFieldProps('mobileNumber')}
                      className={common.TextField}
                      error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                      helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    />
                  </FieldWrapper>
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='employee-name' sx={{ marginBottom: '0.25rem' }}>
                    Employee Name <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='employeeName'
                    name='employeeName'
                    type='text'
                    variant='outlined'
                    placeholder='Enter employee name'
                    className={common.TextField}
                    {...formik.getFieldProps('employeeName')}
                    error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                    helperText={formik.touched.employeeName && formik.errors.employeeName}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='id-no-name' sx={{ marginBottom: '0.25rem' }}>
                    Id No. <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='idNo'
                    name='idNo'
                    type='number'
                    variant='outlined'
                    placeholder='Enter id no'
                    className={common.TextField}
                    {...formik.getFieldProps('idNo')}
                    error={formik.touched.idNo && Boolean(formik.errors.idNo)}
                    helperText={formik.touched.idNo && formik.errors.idNo}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='designation-name' sx={{ marginBottom: '0.25rem' }}>
                    Designation <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='designation'
                    name='designation'
                    type='text'
                    variant='outlined'
                    placeholder='Enter designation'
                    className={common.TextField}
                    {...formik.getFieldProps('designation')}
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='blood-group-name' sx={{ marginBottom: '0.25rem' }}>
                    Blood Group <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='bloodGroup'
                    name='bloodGroup'
                    type='text'
                    variant='outlined'
                    placeholder='Enter blood group'
                    className={common.TextField}
                    {...formik.getFieldProps('bloodGroup')}
                    error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                    helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='department-name' sx={{ marginBottom: '0.25rem' }}>
                    Department <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='department'
                    name='department'
                    type='text'
                    variant='outlined'
                    placeholder='Enter department'
                    className={common.TextField}
                    {...formik.getFieldProps('department')}
                    error={formik.touched.department && Boolean(formik.errors.department)}
                    helperText={formik.touched.department && formik.errors.department}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='tag-id-name' sx={{ marginBottom: '0.25rem' }}>
                    Tag ID <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='tagId'
                    name='tagId'
                    type='text'
                    variant='outlined'
                    placeholder='Enter tag id'
                    className={common.TextField}
                    {...formik.getFieldProps('tagId')}
                    error={formik.touched.tagId && Boolean(formik.errors.tagId)}
                    helperText={formik.touched.tagId && formik.errors.tagId}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='location-name' sx={{ marginBottom: '0.25rem' }}>
                    Location <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='location'
                    name='location'
                    type='text'
                    variant='outlined'
                    placeholder='Enter location'
                    className={common.TextField}
                    {...formik.getFieldProps('location')}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='photo-name' sx={{ marginBottom: '0.25rem' }}>
                    Upload Photo <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='photo'
                    name='photo'
                    type='file'
                    variant='outlined'
                    placeholder='Upload photo'
                    className={common.TextField}
                    {...formik.getFieldProps('photo')}
                    error={formik.touched.photo && Boolean(formik.errors.photo)}
                    helperText={formik.touched.photo && formik.errors.photo}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <TextLabel id='pick-up-name' sx={{ marginBottom: '0.25rem' }}>
                  Pick Up Time
                </TextLabel>
                <DatePickerWrapper>
                  <DatePicker
                    fullWidth
                    id='pick-up-time'
                    name='pickUpTime'
                    selected={formik.values.pickUpTime}
                    onChange={date => formik.setFieldValue('pickUpTime', date)}
                    className={datepickerStyles.datepicker}
                    placeholderText='Pick up time'
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <TextLabel id='drop-off-name' sx={{ marginBottom: '0.25rem' }}>
                  Drop Off Time
                </TextLabel>
                <DatePickerWrapper>
                  <DatePicker
                    fullWidth
                    id='drop-off-time'
                    name='dropOffTime'
                    selected={formik.values.dropOffTime}
                    onChange={date => formik.setFieldValue('dropOffTime', date)}
                    className={datepickerStyles.datepicker}
                    placeholderText='Drop off time'
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='comment-name' sx={{ marginBottom: '0.25rem' }}>
                    Comment
                  </TextLabel>
                  <TextInput
                    id='comment'
                    fullWidth
                    name='comment'
                    variant='outlined'
                    placeholder='Comment'
                    className={common.TextField}
                    {...formik.getFieldProps('comment')}
                    error={formik.touched.comment && Boolean(formik.errors.comment)}
                    helperText={formik.touched.comment && formik.errors.comment}
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

export default AddEditEmployeesForm
