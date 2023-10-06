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
import { getAllUsersAction } from 'src/store/catalogs/users/usersActions'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllProfileTypesAction } from 'src/store/settings/profile-types/profileTypesAction'

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)'
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px !important'
  },
  '& .MuiInputLabel-outlined': {
    top: '-9px !important'
  }
}

function AddEditProfileForm(props) {
  const { edit, formik, router, location, currentLocation, customers, slug, onChangeHandler } = props
  const users = useSelector(state => state.users?.getAllUsersList?.data)
  const assets = useSelector(state => state.assets?.getAllAssetList?.data)
  const getAllStates = useSelector(state => state.locations?.getAllStatesList?.data)
  const getAllCities = useSelector(state => state.locations?.getAllCitiesList?.data)
  const profileTypes = useSelector(state => state.profileTypes?.getAllProfileTypesList?.data)
  const getAllCountries = useSelector(state => state.locations?.getAllCountriesList?.data)

  const styles = useCommonStyles()

  const dispatch = useDispatch()

  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })

  const assetsList = assets?.map(asset => {
    return {
      value: asset.id,
      label: asset.name
    }
  })

  console.log(assets, 'assetsList ', assetsList)

  const countriesList = getAllCountries?.map(country => {
    return {
      value: country.id,
      label: country.name
    }
  })

  const profileTypesList = profileTypes?.map(profileType => {
    return {
      value: profileType.id,
      label: profileType.name
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

  const usersList = users?.map(user => {
    return {
      value: user.id,
      label: user.name
    }
  })

  console.log('slug ', slug)

  useEffect(() => {
    dispatch(getAllCountriesAction({ page: 1, limit: 250 }))
  }, [])

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(getAllUsersAction({ page: 1, limit: 250, customer_id: formik.values.customer_id }))

      dispatch(
        getAllAssetAction({
          page: 1,
          limit: 250,
          slug: customersList.find(customer => customer.value === formik.values.customer_id)?.slug
        })
      )

      dispatch(
        getAllProfileTypesAction({
          customer_id: customersList.find(customer => customer.value === formik.values.customer_id)
        })
      )
    }
  }, [formik.values.customer_id])

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

  console.log('formik values : ', formik.values)
  console.log('formik errors : ', formik.errors)

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        {/* <HeaderLabel>{router.pathname === '/catalogs/campus/add-edit/add' ? 'Add' : 'Edit'}</HeaderLabel> */}
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
                <TextLabel sx={{ color: 'white', whiteSpace: 'break-spaces' }}>Select your location on the map</TextLabel>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                  First Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth

                  // disabled={!formik.values.lat}
                  max={10}
                  id='first_name'
                  name='first_name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter First Name'
                  className={styles.TextField}
                  {...formik.getFieldProps('first_name')}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-last-name' sx={{ marginBottom: '0.25rem' }}>
                  Last Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth

                  // disabled={!formik.values.lat}
                  max={10}
                  id='last_name'
                  name='last_name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Last Name'
                  className={styles.TextField}
                  {...formik.getFieldProps('last_name')}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-email' sx={{ marginBottom: '0.25rem' }}>
                  Email <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth

                  // disabled={!formik.values.lat}
                  max={10}
                  id='email'
                  name='email'
                  type='email'
                  variant='outlined'
                  placeholder='Enter Email'
                  className={styles.TextField}
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-contact' sx={{ marginBottom: '0.25rem' }}>
                  Contact <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='contact_number'
                  name='contact_number'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Enter Contact Number'
                  className={styles.TextField}
                  {...formik.getFieldProps('contact_number')}
                  error={formik.touched.contact_number && Boolean(formik.errors.contact_number)}
                  helperText={formik.touched.contact_number && formik.errors.contact_number}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Country <span style={{ color: 'red' }}>*</span>
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
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Country'
                      error={formik.touched.country_id && Boolean(formik.errors.country_id)}
                      helperText={formik.touched.country_id && formik.errors.country_id}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  State <span style={{ color: 'red' }}>*</span>
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
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select State'
                      error={formik.touched.state_id && Boolean(formik.errors.state_id)}
                      helperText={formik.touched.state_id && formik.errors.state_id}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  City <span style={{ color: 'red' }}>*</span>
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
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          {/* {!edit && ( */}
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Customer <span style={{ color: 'red' }}>*</span>
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
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          {/* )} */}

          {!edit && (
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='profile-user-id' sx={{ marginBottom: '0.25rem' }}>
                    User <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='user_id'
                    name='user_id'

                    // disabled={!formik.values.customer_id}
                    options={usersList}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('user_id', value?.value)
                    }}
                    value={usersList?.find(user => user.value === parseInt(formik.values.user_id))}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.user_id && formik.errors.user_id && '#E53E3E !important'
                      }
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select User'
                        error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                        helperText={formik.touched.user_id && formik.errors.user_id}
                      />
                    )}
                    className={styles.AutoCompleteSelect}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          )}

          {!edit && (
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='profile-profile-typ-id' sx={{ marginBottom: '0.e25rem' }}>
                    Profile Type <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='profile_type_id'
                    name='profile_type_id'

                    // disabled={!formik.values.customer_id}
                    options={profileTypesList}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('profile_type_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          formik.touched.profile_type_id && formik.errors.profile_type_id && '#E53E3E !important'
                      }
                    }}
                    value={profileTypesList?.find(
                      profileType => profileType.value === parseInt(formik.values.profile_type_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Profile Type'
                        error={formik.touched.profile_type_id && Boolean(formik.errors.profile_type_id)}
                        helperText={formik.touched.profile_type_id && formik.errors.profile_type_id}
                      />
                    )}
                    className={styles.AutoCompleteSelect}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-asset-id' sx={{ marginBottom: '0.25rem' }}>
                  Asset <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_id'
                  name='asset_id'

                  // disabled={!formik.values.customer_id}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                    }
                  }}
                  options={assetsList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_id', value?.value)
                  }}
                  value={assetsList?.find(asset => asset.value === parseInt(formik.values.asset_id))}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset'
                      error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                      helperText={formik.touched.asset_id && formik.errors.asset_id}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditProfileForm
