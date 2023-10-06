import React from 'react'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import { Required } from 'src/styles/pages/services/edit'


const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const warehouses = [
  { name: 'Warehouse 1' },
  { name: 'Warehouse 2' },
  { name: 'Warehouse 3' },
  { name: 'Warehouse 4' },
  { name: 'Warehouse 5' }
]

const categories = [
  { name: 'Category 1' },
  { name: 'Category 2' },
  { name: 'Category 3' },
  { name: 'Category 4' },
  { name: 'Category 5' }
]

const types = [{ name: 'Type 1' }, { name: 'Type 2' }, { name: 'Type 3' }, { name: 'Type 4' }, { name: 'Type 5' }]

function AddEditGeofenceForm({ router, formik }) {
  const styles = useCommonStyles();

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='geofence-name' sx={{ marginBottom: '0.25rem' }}>
                  Geofence Name<Required>*</Required>
                </TextLabel>

                <TextInput
                  fullWidth
                  id='geofence-name'
                  name='name'
                  variant='outlined'
                  placeholder='Enter Geofence Name'
                  {...formik.getFieldProps('name')}
                  className={styles.TextField}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='geofence-lat' sx={{ marginBottom: '0.25rem' }}>
                  Geofence Latitude<Required>*</Required>
                </TextLabel>

                <TextInput
                  fullWidth
                  id='geofence-lat'
                  name='geofence-lat'
                  variant='outlined'
                  placeholder='Enter Geofence Latitude'
                  className={styles.TextField}
                  {...formik.getFieldProps('lat')}
                  error={formik.touched.lat && Boolean(formik.errors.lat)}
                  helperText={formik.touched.lat && formik.errors.lat}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='geofence-lng' sx={{ marginBottom: '0.25rem' }}>
                  Geofence Longitude<Required>*</Required>
                </TextLabel>

                <TextInput
                  fullWidth
                  id='geofence-lng'
                  name='geofence-lng'
                  variant='outlined'
                  placeholder='Enter Geofence Longitude'
                  className={styles.TextField}
                  {...formik.getFieldProps('lng')}
                  error={formik.touched.lng && Boolean(formik.errors.lng)}
                  helperText={formik.touched.lng && formik.errors.lng}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditGeofenceForm
