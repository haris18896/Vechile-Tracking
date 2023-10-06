import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'

function AddEditGeofenceHeader({ loading, router, submitHandler, title }) {
  return (
    <SettingsWrapper>

      <Grid container spacing={4}>
        
        <Grid item xs={12} sm sx={{  marginBottom : { xs: 2, sm: 0 } }}>
            <HeaderLabel>{title}</HeaderLabel>
        </Grid>

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
          onClick={submitHandler}
        >
          Save
        </ButtonIcon>
      </Grid>

        <Grid item>
        <ButtonIcon
          sx={{ width: 120 }}
          color='grey'
          iconWidth={30}
          iconHeight={20}
          startIcon={'prime:times'}
          onClick={() => router.back()}
        >
          Cancel
        </ButtonIcon>
        </Grid>

      </Grid>
    </SettingsWrapper>
  )
}

export default AddEditGeofenceHeader

AddEditGeofenceHeader.propTypes = {
  router: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
}
