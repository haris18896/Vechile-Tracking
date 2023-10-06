/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'

function SearchDriverForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1' },
    { id: '2', label: 'Account 2' }
  ]

  const driverOptions = [
    { id: '1', label: 'Driver 1' },
    { id: '2', label: 'Driver 2' }
  ]

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                Account
              </TextLabel>
              <Autocomplete
                fullWidth
                id='account'
                name='account'
                options={accountOptions && accountOptions}

                // disabled={!formik.values.country_id}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('account', e.target.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                  }
                }}
                value={accountOptions?.find(account => account.label === formik.values.account)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Account'
                    error={formik.touched.account && Boolean(formik.errors.account)}
                    helperText={formik.touched.account && formik.errors.account}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Driver Name</TextLabel>
              <Autocomplete
                fullWidth
                id='driver_name'
                name='driver_name'
                options={driverOptions}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('driver_name', e.target.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.driver_name && formik.errors.driver_name && '#E53E3E !important'
                  }
                }}
                value={driverOptions?.find(driver => driver.label === formik.values.driver_name)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Search Driver'
                    error={formik.touched.driver_name && Boolean(formik.errors.driver_name)}
                    helperText={formik.touched.driver_name && formik.errors.driver_name}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign='right' sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <ButtonIcon
            sx={{ width: 120 }}
            color='success-outlined'
            iconWidth={30}
            iconHeight={'auto'}
            onClick={formik.handleSubmit}
          >
            Search
          </ButtonIcon>
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchDriverForm
