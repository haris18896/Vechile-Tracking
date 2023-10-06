import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'

function AddEditSimHeader({ router, submitHandler }) {
  return (
    <SettingsWrapper>
      <Grid container spacing={4} sx={{ justifyContent: 'space-between', px: 5 }}>
        <Grid item xs={12} sm={3}>
          <FieldWrapper>
            <HeaderLabel>
              {router.pathname === '/catalogs/sim-list/add-or-edit/add' ? 'Add SIM Details' : 'Edit SIM Details'}
            </HeaderLabel>
          </FieldWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={4} justifyContent={{ xs: 'start', sm: 'end' }}>
            <Grid item>
              <ButtonIcon
                color='grey'
                startIcon={'material-symbols:chevron-left-rounded'}
                onClick={() => router.push('/catalogs/sim-list')}
              >
                Back
              </ButtonIcon>
            </Grid>

            <Grid item>
              <ButtonIcon
                color='success'
                startIcon={'material-symbols:check-small-rounded'}
                onClick={() => submitHandler()}
              >
                Save
              </ButtonIcon>
            </Grid>

            <Grid item>
              <ButtonIcon color='grey' startIcon={'charm:cross'} onClick={() => router.push('/catalogs/sim-list')}>
                Cancel
              </ButtonIcon>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default AddEditSimHeader

AddEditSimHeader.propTypes = {
  router: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
}
