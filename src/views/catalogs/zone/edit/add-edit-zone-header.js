import React from 'react'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'

function AddEditZoneHeader({ loading, router, formik }) {
  return (
    <SettingsWrapper>
      <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6} md={4}>
          <FieldWrapper>
            <HeaderLabel>
              {router.pathname === '/catalogs/zone/edit/add' ? 'Add Geofence Zone' : 'Edit Geofence Zone'}
            </HeaderLabel>
          </FieldWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={4} justifyContent={{ xs: 'start', sm: 'end' }}>
            <Grid item>
              <ButtonIcon
                color='grey'
                startIcon={'material-symbols:chevron-left-rounded'}
                onClick={() => router.back()}
              >
                Back
              </ButtonIcon>
            </Grid>

            <Grid item>
              <ButtonIcon
                color='success'
                startIcon={loading ? 'line-md:loading-twotone-loop' : 'material-symbols:check-small-rounded'}
                onClick={() => formik.handleSubmit()}
              >
                Save
              </ButtonIcon>
            </Grid>

            <Grid item>
              <ButtonIcon color='grey' startIcon={'prime:times'} onClick={() => router.back()}>
                Cancel
              </ButtonIcon>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default AddEditZoneHeader
