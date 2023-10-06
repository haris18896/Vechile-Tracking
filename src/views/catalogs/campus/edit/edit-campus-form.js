/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Card, Grid, TextField } from '@mui/material'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { SettingsWrapper } from 'src/styles/pages/settings'

// ** Store and Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesAction, getAllStatesAction, getAllCitiesAction } from 'src/store/locations/locationsAction'

function AddEditCampusForm(props) {
  const { edit, formik, router, location, currentLocation, customers, slug, onChangeHandler } = props
  const getAllCountries = useSelector(state => state.locations?.getAllCountriesList?.data)
  const getAllStates = useSelector(state => state.locations?.getAllStatesList?.data)
  const getAllCities = useSelector(state => state.locations?.getAllCitiesList?.data)

  const styles = useCommonStyles()

  const dispatch = useDispatch()

  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })

  const countriesList = getAllCountries?.map(country => {
    return {
      value: country.id,
      label: country.name
    }
  })

  const statesList = getAllStates?.map(state => {
    return {
      value: state.id,
      label: state.name
    }
  })

  const citiesList = getAllCities?.map(city => {
    return {
      value: city.id,
      label: city.name
    }
  })

  useEffect(() => {
    dispatch(getAllCountriesAction({ page: 1, limit: 250 }))
  }, [])

  useEffect(() => {
    if (formik.values.country_id) {
      dispatch(getAllStatesAction({ page: 1, limit: 250, countryId: formik.values.country_id }))
    }
  }, [formik.values.country_id])

  useEffect(() => {
    if (formik.values.state_id) {
      dispatch(getAllCitiesAction({ page: 1, limit: 250, stateId: formik.values.state_id }))
    }
  }, [formik.values.state_id])

  return (
    <SettingsWrapper sx={{ mx: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <SmallMapWrapper>
              <GoogleMapComponent
                zoom={17}
                center={currentLocation}
                customContainer={{
                  width: '100%',
                  height: '300px'
                }}
                mapClick={e => {
                  console.log('map clicked', e)
                  onChangeHandler('location', e)
                }}
              >
                <Marker
                  position={location}
                  onClick={() => {
                    console.log('marker clicked', location)
                  }}
                />
              </GoogleMapComponent>
            </SmallMapWrapper>
          </Grid>

          <Grid xs={12} item>
            {/* warning card for selecting location on the map */}
            {formik.errors.lat && formik.errors.lng && (
              <Card sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
                <TextLabel sx={{ color: 'white', whiteSpace: 'normal' }}>Select your location on the map</TextLabel>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Campus Name
                </TextLabel>
                <TextInput
                  fullWidth
                  // disabled={!formik.values.lat}
                  max={10}
                  id='name'
                  name='name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Campus Name'
                  {...formik.getFieldProps('name')}
                  className={styles.TextField}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Address
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='address'
                  name='address'
                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Enter Campus Address'
                  className={styles.TextField}
                  {...formik.getFieldProps('address')}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Country
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='country_id'
                  name='country_id'
                  // disabled={!formik.values.lat}
                  options={countriesList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('country_id', value?.value)
                    formik.setFieldValue('state_id', '')
                    formik.setFieldValue('city_id', '')
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.country_id && formik.errors.country_id && '#E53E3E !important'
                    }
                  }}
                  value={countriesList?.find(country => country.value === formik.values.country_id)}
                  className={styles.AutoCompleteSelect}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Country'
                      error={formik.touched.country_id && Boolean(formik.errors.country_id)}
                      helperText={formik.touched.country_id && formik.errors.country_id}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  State
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='state_id'
                  name='state_id'
                  options={statesList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  // disabled={!formik.values.country_id}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('state_id', value?.value)
                    formik.setFieldValue('city_id', '')
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.state_id && formik.errors.state_id && '#E53E3E !important'
                    }
                  }}
                  value={statesList?.find(state => state.value === formik.values.state_id)}
                  className={styles.AutoCompleteSelect}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select State'
                      error={formik.touched.state_id && Boolean(formik.errors.state_id)}
                      helperText={formik.touched.state_id && formik.errors.state_id}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  City
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='city_id'
                  name='city_id'
                  options={citiesList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  // disabled={!formik.values.state_id}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('city_id', value?.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.city_id && formik.errors.city_id && '#E53E3E !important'
                    }
                  }}
                  className={styles.AutoCompleteSelect}
                  value={citiesList?.find(city => city.value === formik.values.city_id)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select City'
                      error={formik.touched.city_id && Boolean(formik.errors.city_id)}
                      helperText={formik.touched.city_id && formik.errors.city_id}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          {!edit && (
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                    Customer
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='customer_id'
                    name='customer_id'
                    // disabled={!formik.values.lat}
                    options={customersList}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('customer_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.customer_id && formik.errors.customer_id && '#E53E3E !important'
                      }
                    }}
                    className={styles.AutoCompleteSelect}
                    value={customersList?.find(customer => customer.value === parseInt(formik.values.customer_id))}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Customer'
                        error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                        helperText={formik.touched.customer_id && formik.errors.customer_id}
                      />
                    )}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditCampusForm
