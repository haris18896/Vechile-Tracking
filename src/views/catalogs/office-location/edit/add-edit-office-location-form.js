import React from 'react'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Third Party Packages
import { Icon } from '@iconify/react'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper, FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { autoCompleteStyles } from 'src/styles/common'
import { useCustomStyles } from 'src/styles/pages/catalogs'


const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const officeTypes = [
  { name: 'Office Type 1' },
  { name: 'Office Type 2' },
  { name: 'Office Type 3' },
  { name: 'Office Type 4' },
  { name: 'Office Type 5' }
]

function AddEditOfficeLocationForm({ router, formik }) {
  // console.log('formik values : ', formik.values)
  // console.log('formik errors : ', formik.errors)

  const styles = useCustomStyles()

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accounts}
                  className={styles.AutoCompleteSelect}
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
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Contact Person Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='contact-person-name'
                  name='contactPersonName'
                  variant='outlined'
                  placeholder='Enter contact person name'
                  className={styles.TextField}
                  {...formik.getFieldProps('contactPersonName')}
                  error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                  helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Office Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='office-name'
                  name='officeName'
                  variant='outlined'
                  placeholder='Enter office name'
                  className={styles.TextField}
                  {...formik.getFieldProps('officeName')}
                  error={formik.touched.officeName && Boolean(formik.errors.officeName)}
                  helperText={formik.touched.officeName && formik.errors.officeName}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Contact Person Email <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='contact-person-email'
                  name='contactPersonEmail'
                  variant='outlined'
                  placeholder='Enter contact person email'
                  className={styles.TextField}
                  {...formik.getFieldProps('contactPersonEmail')}
                  error={formik.touched.contactPersonEmail && Boolean(formik.errors.contactPersonEmail)}
                  helperText={formik.touched.contactPersonEmail && formik.errors.contactPersonEmail}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Office Type <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='officeType'
                  name='officeType'
                  options={officeTypes}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('officeType', newValue.name)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.officeType && formik.errors.officeType && '#E53E3E !important'
                    }
                  }}
                  value={officeTypes.find(officeType => officeType.name === formik.values.officeType)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select office type'
                      error={formik.touched.officeType && Boolean(formik.errors.officeType)}
                      helperText={formik.touched.officeType && formik.errors.officeType}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Office Location <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    id='officeLocation'
                    name='officeLocation'
                    variant='outlined'
                    placeholder='Enter office location'
                    className={styles.TextField}
                    {...formik.getFieldProps('officeLocation')}
                    error={formik.touched.officeLocation && Boolean(formik.errors.officeLocation)}
                    helperText={formik.touched.officeLocation && formik.errors.officeLocation}
                  />

                  <CustomChip
                    size='small'
                    label={
                      <Icon
                        icon='ic:baseline-location-on'
                        width='25'
                        height='25'
                        color='success'
                        style={{ marginTop: '4px' }}
                      />
                    }
                    color='success'
                    skin='light'
                    sx={{
                      padding: '0.95rem 0rem',
                      marginLeft: '0.5rem'
                    }}
                  />
                </FieldHorizontalWrapper>
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditOfficeLocationForm
