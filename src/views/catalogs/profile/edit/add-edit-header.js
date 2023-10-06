import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { Box } from '@mui/material'

const paths = [
  {
    path: '/catalogs/parents/add-edit/add',
    edit: '/catalogs/parents/add-edit/add/:id'
  },
  {
    path: '/catalogs/teachers/add-edit/add',
    edit: '/catalogs/teachers/add-edit/add/:id'
  },
  {
    path: '/catalogs/driver/add-edit/add',
    edit: '/catalogs/driver/add-edit/add/:id'
  },
  {
    path: '/catalogs/students/add-edit/add',
    edit: '/catalogs/students/add-edit/add/:id'
  }
]

function AddEditProfileHeader({ loading, router, submitHandler }) {
  return (
    <SettingsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} sm mb={{ xs: 2, sm: 0 }}>
            <HeaderLabel>{router.pathname.includes('add-edit/add') ? 'Add Profile' : 'Edit Profile'}</HeaderLabel>
          </Grid>

          <Grid item ml={{ xs: '0', sm: 'auto' }}>
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

export default AddEditProfileHeader

AddEditProfileHeader.propTypes = {
  router: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
}
