import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import {
  Select,
  TextField,
  MenuItem,
  Checkbox,
  Grid,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  Box
} from '@mui/material'

// ** Custom Components
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { PlaceholderText } from 'src/styles/pages/graphs'

function ManageEmailModule({ formik }) {
  const common = useCustomStyles()

  const accounts = [
    { name: 'Account 1' },
    { name: 'Account 2' },
    { name: 'Account 3' },
    { name: 'Account 4' },
    { name: 'Account 5' }
  ]

  console.log('rendering again..')

  return (
    <form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item xs={10} md={8}>
                <FieldWrapper sx={{ margin: '0 0 0.5rem 0' }}>
                  <TextLabel id='email-name' sx={{ marginBottom: '0.25rem' }}>
                    Account <span style={{ color: 'red' }}>*</span>
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
                </FieldWrapper>
              </Grid>
              <Grid item xs={2} md={2} sx={{ paddingLeft: { xs: 4, sm: 8 }, paddingTop: 4 }}>
                <FormGroup sx={{ marginRight: 6 }}>
                  <FormControlLabel
                    sx={{ justifyContent: { md: 'start', xs: 'end' }, marginRight: '0' }}
                    control={
                      <Checkbox
                        id='all'
                        name='all'
                        type='checkbox'
                        sx={{ padding: 0, marginRight: { xs: 1, sm: 3 }, justifyContent: 'end' }}
                        checked={formik.values.all == true}
                        {...formik.getFieldProps('all')}
                        error={formik.touched.all && Boolean(formik.errors.all)}
                        helperText={formik.touched.all && formik.errors.all}
                      />
                    }
                    label='All'
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='email-name' sx={{ marginBottom: '0.25rem' }}>
                  Subject <span style={{ color: 'red' }}>*</span>
                </TextLabel>

                <TextInput
                  fullWidth
                  id='subject'
                  name='subject'
                  type='text'
                  variant='outlined'
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '0.35rem 1.5rem'
                    }
                  }}
                  className={common.TextField}
                  placeholder='Enter Subject'
                  {...formik.getFieldProps('subject')}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='email-name' sx={{ marginBottom: '0.25rem' }}>
                  Email ID <span style={{ color: 'red' }}>*</span>
                </TextLabel>

                <TextInput
                  fullWidth
                  id='emailId'
                  name='emailId'
                  type='test'
                  variant='outlined'
                  placeholder='Enter Email ID'
                  className={common.TextField}
                  {...formik.getFieldProps('emailId')}
                  error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                  helperText={formik.touched.emailId && formik.errors.emailId}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='email-name' sx={{ marginBottom: '0.25rem' }}>
                  Email Body
                </TextLabel>

                <TextField
                  multiline
                  fullWidth
                  rows={3}
                  id='emailBody'
                  name='emailBody'
                  type='textarea'
                  variant='outlined'
                  className={common.TextArea}
                  {...formik.getFieldProps('emailBody')}
                  error={formik.touched.emailBody && Boolean(formik.errors.emailBody)}
                  helperText={formik.touched.emailBody && formik.errors.emailBody}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}

export default ManageEmailModule

ManageEmailModule.propTypes = {
  formik: PropTypes.object
}
