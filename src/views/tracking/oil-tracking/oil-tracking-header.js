import React from 'react'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Components
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { Autocomplete, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'

function OilTrackingHeader({ account, onChangeHandler, ability }) {

  const styles = useCommonStyles();

  const accountsList = [
    {
      value: '1',
      label: 'Account 1'
    },
    {
      value: '2',
      label: 'Account 2'
    },
    {
      value: '3',
      label: 'Account 3'
    }
  ]

  return (
    <SettingsWrapper 
    sx={{ backgroundColor: '#fff' }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9.5} sx={{ marginBottom: '0.5rem' }}>
          <HeaderLabel>Oil Tracking Dashboard</HeaderLabel>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2.5}
        >
            <Autocomplete
              fullWidth
              id='account'
              name='account'
              disabled={!accountsList.length}
              options={accountsList}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
              getOptionLabel={option => option.label}
              onChange={(e, value) => {
                onChangeHandler('account', value?.value)
              }}
              value={accountsList?.find(account => account.value === account)}
              renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Account' />}
              className={styles.AutoCompleteSelect}
            />
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default OilTrackingHeader
