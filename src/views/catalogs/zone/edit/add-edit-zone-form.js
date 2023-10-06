import React from 'react'

// ** MUI
import { Grid } from '@mui/material'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import { TextInput, TextLabel } from 'src/styles/components/input'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

function AddEditZoneForm({ formik }) {
  // ** Styles
  const styles = useCustomStyles()

  return (
    <SettingsWrapper>
      <form onSubmit={() => formik.handleSubmit()}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                Name <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='name'
                name='name'
                variant='outlined'
                placeholder='Enter name'
                onChange={e => formik.setFieldValue('name', e.target.value)}
                value={formik.values.name}
                className={styles.TextField}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditZoneForm
