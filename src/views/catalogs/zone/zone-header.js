import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Contexts
import { TableUIContext } from 'src/contexts/TableContext'

function ZoneHeader({ ability, router }) {
  // ** Getting Table Context and Passing Header Refrence
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  return (
    <SettingsWrapper ref={headerRef}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>Geofence Zone</Title>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
            {ability.can('create', 'create-zone') && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <FieldHorizontalWrapper>
                  <ButtonIcon
                    color='success'
                    style={{ width: 120 }}
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push('/catalogs/zone/edit/add')}
                  >
                    Add
                  </ButtonIcon>
                </FieldHorizontalWrapper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default ZoneHeader

ZoneHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
