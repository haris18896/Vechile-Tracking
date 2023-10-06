/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Card, Grid, TextField } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'


function SearchPOIForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1',  },
    { id: '2', label: 'Account 2'  }
  ]

  const poiOptions = [
    { id: '1', label: 'Poi 1',  },
    { id: '2', label: 'Poi 2'  }
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
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  POI Name
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='poi_name'
                  name='poi_name'
                  options={poiOptions}

                  // disabled={!formik.values.country_id}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('poi_name', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.poi_name && formik.errors.poi_name && '#E53E3E !important'
                    }
                  }}
                  value={poiOptions?.find(poi => poi.label === formik.values.poi_name)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='POI Name'
                      error={formik.touched.poi_name && Boolean(formik.errors.poi_name)}
                      helperText={formik.touched.poi_name && formik.errors.poi_name}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} textAlign="right">
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

export default SearchPOIForm
