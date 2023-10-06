/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'

function CreatePOIForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1' },
    { id: '2', label: 'Account 2' }
  ]

  const typeOptions = [
    { id: '1', label: 'Type 1' },
    { id: '2', label: 'Type 2' }
  ]

  const assetOptions = [
    { id: '1', label: 'Asset 1' },
    { id: '2', label: 'Asset 2' }
  ]

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                Account
              </TextLabel>
              <Autocomplete
                fullWidth
                id='account'
                name='account'
                options={accountOptions && accountOptions}
                // disabled={!formik.values.country_id}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('account', e.target.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                  }
                }}
                value={accountOptions?.find(account => account.label === formik.values.account)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select State'
                    error={formik.touched.account && Boolean(formik.errors.account)}
                    helperText={formik.touched.account && formik.errors.account}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                defaultValue={false}
                value={formik?.values.vehicle_location}
                onChange={() => formik.setFieldValue('vehicle_location', !formik.values.vehicle_location)}
              />
            }
            label={
              <Typography sx={{ fontWeight: '500', textAlign: 'center', color: '#4B5563' }}>
                Current Vehicle Location
              </Typography>
            }
          />
        </Grid>

        {formik?.values.vehicle_location && (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>Asset No.</TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_no'
                  name='asset_no'
                  options={assetOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_no', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_no && formik.errors.asset_no && '#E53E3E !important'
                    }
                  }}
                  value={assetOptions?.find(asset => asset.label === formik.values.asset_no)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset No.'
                      error={formik.touched.asset_no && Boolean(formik.errors.asset_no)}
                      helperText={formik.touched.asset_no && formik.errors.asset_no}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Address</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='address'
                name='address'
                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Enter Address'
                className={styles.TextField}
                {...formik.getFieldProps('address')}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Name</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='name'
                name='name'
                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Name'
                className={styles.TextField}
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Account</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='account'
                name='account'
                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Account'
                className={styles.TextField}
                {...formik.getFieldProps('account')}
                error={formik.touched.account && Boolean(formik.errors.account)}
                helperText={formik.touched.account && formik.errors.account}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Type</TextLabel>
              <Autocomplete
                fullWidth
                id='type'
                name='type'
                options={typeOptions}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('type', e.target.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.type && formik.errors.type && '#E53E3E !important'
                  }
                }}
                value={typeOptions?.find(poi => poi.label === formik.values.type)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select POI Type'
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Upload</TextLabel>
              <Grid display='flex' alignItems='start' gap={4} mt={2}>
                <Button
                  variant='contained'
                  component='label'
                  sx={{
                    background: '#FF8B00',
                    borderRadius: '50px',
                    width: '200px',
                    flexShrink: 0,
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
                <Typography sx={{ fontSize: '0.875rem', color: '#000', fontWeight: '600' }}>
                  {formik?.values?.file ? formik?.values?.file.slice(0, 50) + '...' : ''}
                </Typography>
              </Grid>
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Phone No.</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='phone_no'
                name='phone_no'
                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Phone No.'
                className={styles.TextField}
                {...formik.getFieldProps('phone_no')}
                error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                helperText={formik.touched.phone_no && formik.errors.phone_no}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign='right' sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <ButtonIcon
            sx={{ width: 160 }}
            color='error'
            iconWidth={30}
            iconHeight={'auto'}
            onClick={formik.handleSubmit}
          >
            Remove POI
          </ButtonIcon>

          <ButtonIcon
            sx={{ width: 140 }}
            color='success-outlined'
            iconWidth={30}
            iconHeight={'auto'}
            onClick={formik.handleSubmit}
          >
            Save
          </ButtonIcon>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreatePOIForm
