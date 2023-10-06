import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { HeaderLabel, TextInput, TextLabel } from 'src/styles/components/input'

import { useCustomStyles } from 'src/styles/pages/services/edit'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

//Modal for Route Management
const Modal = ({ open, handleClose, title, handleSubmit, vehicles, accountOptions, employmentOptions, formik, nationalityOptions,licenseOptions }) => {
  const [asset, setAsset] = useState('')
  const styles = useCommonStyles({ modalBg: '#fff' })

  const vehicleOptions = [
    {
      name: 'Heavy Vehicle'
    },
    {
      name: 'Light Vehicle'
    }
  ] 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-permission'
      className={styles.Modal}
      PaperProps={{ sx: { width: '80%', background: '#fff' } }}
    >
      <DialogTitle id='add-permission' sx={{ fontWeight: '700', color: '#556485' }}>
        {title}
      </DialogTitle>
      <form name='add-permissions' onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={5} columnSpacing={10}>
            <Grid item xs={12} md={6}>
            <HeaderLabel sx={{ fontSize: '1rem'}}>Driver Details</HeaderLabel>
            <Grid item xs={12} mt={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accountOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('account', newValue?.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                    }
                  }}
                  value={formik.values.account ? (accountOptions ? accountOptions.find(account => account.value === formik.values.account) : '') : ''}
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

          <Grid item xs={12} md={6}>
          <HeaderLabel sx={{ fontSize: '1rem'}}>Employee Information</HeaderLabel>
            <Grid item xs={12} md={12}  mt={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Employee ID
                </TextLabel>
                <TextInput
                  fullWidth
                  id='employeeId'
                  name='employeeId'
                  variant='outlined'

                  placeholder='Enter Employee ID'
                  {...formik.getFieldProps('employeeId')}
                  className={styles.TextField}
                  error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                  helperText={formik.touched.employeeId && formik.errors.employeeId}
                />
            </Grid>
          </Grid>

              {/* Vehicles Checkboxes */}
              <Grid item xs={12} md={6}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Asset Type
                </TextLabel>
                <Grid container sx={{ padding: '0.2rem 1rem' }}>
                  <Grid item xs={12} display="flex">
                    {vehicleOptions.map(vehicle => (
                      <FormControlLabel
                        key={vehicle.name}
                        sx={{ width: '100%' }}
                        control={
                          <Checkbox
                            defaultValue={false}
                            sx={{
                              '&.Mui-checked': {
                                color: '#FF8B00'
                              }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                            {vehicle.name}
                          </Typography>
                        }
                      />
                    ))}

                  </Grid>
                </Grid>
              </Grid>

            <Grid item xs={12} md={6}>
            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Employment Status
                </TextLabel>
                <Autocomplete
                  id='emp_status'
                  name='emp_status'
                  options={employmentOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('emp_status', newValue?.value)
                  }}
                  value={formik.values.emp_status ?  (employmentOptions ? employmentOptions.find(emp => emp.value === formik.values.emp_status) : '') : ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'

                      placeholder='Select Employment Status'
                      error={formik.touched.emp_status && Boolean(formik.errors.emp_status)}
                      helperText={formik.touched.emp_status && formik.errors.emp_status}
                    />
                  )}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='name'
                  name='name'
                  variant='outlined'

                  placeholder='Enter Name'
                  {...formik.getFieldProps('name')}
                  className={styles.TextField}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Nationality
                </TextLabel>
                <Autocomplete
                  id='nationality'
                  name='nationality'
                  options={nationalityOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('nationality', newValue?.value)
                  }}
                  value={formik.values.nationality ? (nationalityOptions ? nationalityOptions.find(nat => nat.value === formik.values.nationality) : '') : ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'

                      placeholder='Select Nationality'
                      error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                      helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                  )}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Sponsor
                </TextLabel>
                <Autocomplete
                  id='sponsor'
                  name='sponsor'
                  options={employmentOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('sponsor', newValue?.value)
                  }}
                  value={formik.values.sponsor ? (employmentOptions ? employmentOptions.find(emp => emp.value === formik.values.sponsor) : '') : ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Sponsor'
                      error={formik.touched.sponsor && Boolean(formik.errors.sponsor)}
                      helperText={formik.touched.sponsor && formik.errors.sponsor}
                    />
                  )}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid item xs={12} md={5.7}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Last Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='last_name'
                  name='last_name'
                  variant='outlined'

                  placeholder='Enter Last Name'
                  {...formik.getFieldProps('last_name')}
                  className={styles.TextField}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Address
                </TextLabel>
                <TextInput
                  fullWidth
                  id='address'
                  name='address'
                  variant='outlined'
                  placeholder='Enter Address'
                  {...formik.getFieldProps('address')}
                  className={styles.TextField}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} position="relative" top={{ md: '-55px'}}> 
          <HeaderLabel sx={{ fontSize: '1rem'}}>Driving Details</HeaderLabel>
            <Grid item xs={12} mt={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  License Type
                </TextLabel>
                <Autocomplete
                  id='license_type'
                  name='license_type'
                  options={licenseOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('license_type', newValue?.value)
                  }}
                  value={formik.values.license_type ? (licenseOptions ? licenseOptions.find(license => license.value === formik.values.license_type) : '') : ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'

                      placeholder='Select License Type'
                      error={formik.touched.license_type && Boolean(formik.errors.license_type)}
                      helperText={formik.touched.license_type && formik.errors.license_type}
                    />
                  )}
                />
            </Grid>
          </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <ButtonIcon type='submit' color='orange' sx={{ width: '100%' }}>
            Save
          </ButtonIcon>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Modal
