import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { Box } from '@mui/system'

function AddEditWarehouseHeader({ loading, router, submitHandler }) {
  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={12} sm={6} md={4}>
            <FieldWrapper>
              <HeaderLabel>
                {router.pathname === '/catalogs/warehouse/edit/add' ? 'Add Warehouse' : 'Edit warehouse'}
              </HeaderLabel>
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
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
                  onClick={submitHandler}
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
      </Box>
    </SettingsWrapper>
  )
}

export default AddEditWarehouseHeader

AddEditWarehouseHeader.propTypes = {
  router: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
}
