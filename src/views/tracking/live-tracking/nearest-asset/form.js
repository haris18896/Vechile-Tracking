/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'


function NearestAssetForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1',  },
    { id: '2', label: 'Account 2'  }
  ]

  const typeOptions = [
    { id: '1', label: 'Type 1',  },
    { id: '2', label: 'Type 2'  }
  ]

  const assetOptions = [
    { id: '1', label: 'Asset 1',  },
    { id: '2', label: 'Asset 2'  }
  ]

  const geofenceOptions = [
    { id: '1', label: 'Geofence 1',  },
    { id: '2', label: 'Geofence 2'  }
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
                      placeholder='Select Account'
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
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Search By
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='search_by'
                  name='search_by'
                  options={typeOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('search_by', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.search_by && formik.errors.search_by && '#E53E3E !important'
                    }
                  }}
                  value={typeOptions?.find(poi => poi.label === formik.values.search_by)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Please Select'
                      error={formik.touched.search_by && Boolean(formik.errors.search_by)}
                      helperText={formik.touched.search_by && formik.errors.search_by}
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
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Asset Name
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_name'
                  name='asset_name'
                  options={assetOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_name', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                    }
                  }}
                  value={assetOptions?.find(asset => asset.label === formik.values.asset_name)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Please Select'
                      error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                      helperText={formik.touched.asset_name && formik.errors.asset_name}
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
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                 Select Geofence
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='geofence'
                  name='geofence'
                  options={geofenceOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('geofence', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.geofence && formik.errors.geofence && '#E53E3E !important'
                    }
                  }}
                  value={geofenceOptions?.find(geofence => geofence.label === formik.values.geofence)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Please Select'
                      error={formik.touched.geofence && Boolean(formik.errors.geofence)}
                      helperText={formik.touched.geofence && formik.errors.geofence}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                    Location
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='location'
                  name='location'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Enter Location'
                  className={styles.TextField}
                  {...formik.getFieldProps('speed')}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                  Distance
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='distance'
                  name='distance'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Enter Distance'
                  className={styles.TextField}
                  {...formik.getFieldProps('distance')}
                  error={formik.touched.distance && Boolean(formik.errors.distance)}
                  helperText={formik.touched.distance && formik.errors.distance}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} textAlign="right" sx={{display: 'flex', gap: '10px', justifyContent: 'end'}}>
            <ButtonIcon
              sx={{ width: 120 }}
              color='success-outlined'
              iconWidth={30}
              iconHeight={'auto'}
              onClick={formik.handleSubmit}
            >
             Search
            </ButtonIcon>
          </Grid>

        </Grid>
      </form>
  )
}

export default NearestAssetForm
