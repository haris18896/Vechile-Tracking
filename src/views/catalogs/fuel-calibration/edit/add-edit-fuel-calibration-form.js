import React from 'react'

// ** MUI
import { Grid } from '@mui/material'

// ** Custom Components
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'

function AddEditFuelCalibrationForm({ router, formik }) {
  const styles = useCommonStyles()

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='fuel-calibration-name' sx={{ marginBottom: '0.25rem' }}>
                  Fuel Calibration Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  max={100}
                  id='name'
                  name='name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter fuel calibration name'
                  className={styles.TextField}
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='fuel-tank-capacity' sx={{ marginBottom: '0.25rem' }}>
                  Fuel Tank Capacity <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='capacity'
                  name='capacity'
                  type='number'
                  variant='outlined'
                  placeholder='Enter fuel tank capacity'
                  className={styles.TextField}
                  {...formik.getFieldProps('capacity')}
                  error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                  helperText={formik.touched.capacity && formik.errors.capacity}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid marginTop={10}>
            <ButtonIcon
              color='success'
              startIcon={'ic:baseline-plus'}
              onClick={() => router.push('/catalogs/fuel-calibration/edit/add')}
            >
              Add Record
            </ButtonIcon>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditFuelCalibrationForm
