import React from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldWrapper, FieldHorizontalWrapper, SelectInput } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, TextField } from '@mui/material'

function WorkingHoursHeader({ slug, onChangeHandler, account, ability, router }) {
  const common = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1',  },
    { id: '2', label: 'Account 2'  }
  ]


  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>Working Hours List</Title>
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
            <Grid item xs={12} sm={6} md={3}>
              <FieldWrapper>
              <Autocomplete
                  id='account'
                  name='account'
                  options={accountOptions || []}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => onChangeHandler('account', value?.label)}
                  value={accountOptions?.find(acc => acc.label === account)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Account'
                    />
                  )}
                  className={common.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>

            {ability.can('create', 'create-working-hours') && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <FieldHorizontalWrapper>
                  <ButtonIcon
                    color='success'
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push(`working-hours/edit/add`)}
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

export default WorkingHoursHeader

WorkingHoursHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
