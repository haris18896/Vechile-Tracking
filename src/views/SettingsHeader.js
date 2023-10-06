import React from 'react'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { SettingsWrapper, Title } from 'src/styles/pages/settings'

function SettingsHeader(props) {
  const { ability, title, addBtnText, addClick, abilityType, wasl, waslButtonText, waslClick } = props

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Title>{title}</Title>
        </Grid>

        {ability.can('create', `${abilityType}`) && (
          <Grid
            item
            spacing={2}
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            {wasl && (
              <ButtonIcon sx={{ margin: '0 5px' }} color='success' startIcon={'ic:baseline-plus'} onClick={waslClick}>
                {waslButtonText}
              </ButtonIcon>
            )}
            <ButtonIcon color='success' startIcon={'ic:baseline-plus'} onClick={addClick}>
              {addBtnText}
            </ButtonIcon>
          </Grid>
        )}
      </Grid>
    </SettingsWrapper>
  )
}

export default SettingsHeader
