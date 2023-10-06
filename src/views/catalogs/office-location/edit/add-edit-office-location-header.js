import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { Box } from '@mui/material'

function AddEditOfficeLocationHeader({ loading, router, formik, submitHandler }) {
  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} sm mb={{xs: 2, sm: 0}}>
          <HeaderLabel>
              {router.pathname === '/catalogs/office-location/edit/add'
                ? 'Add Office Location'
                : 'Edit Office Location'}
            </HeaderLabel>
          </Grid>
          <Grid item ml={{ xs: '0', sm: 'auto' }} >
            <ButtonIcon
              sx={{ width: 120 }}
              color='grey'
              iconWidth={20}
              iconHeight={15}
              startIcon={'ic:round-arrow-back-ios-new'}
              onClick={() => router.back()}
            >
              Back
            </ButtonIcon>
          </Grid>

          <Grid item>
            <ButtonIcon
              sx={{ width: 120 }}
              color='success'
              iconWidth={30}
              iconHeight={'auto'}
              startIcon={'material-symbols:check-small-rounded'}
              onClick={() => submitHandler()}
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
      </Box>
    </SettingsWrapper>
  )
}

export default AddEditOfficeLocationHeader

AddEditOfficeLocationHeader.propTypes = {
  router: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
}
