/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI
import { Autocomplete, Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { PlaceholderText } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** React DatePicker
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'

// ** Third Party Libraries
import moment from 'moment'

// Redux Hooks and Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from 'src/store/catalogs/users/usersActions'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllGeofenceTypeAction } from 'src/store/tracking/geofence/geofenceAction'
import { getAllZoneAction } from 'src/store/catalogs/zone/zoneActions'
import { getAllGroupAction } from 'src/store/catalogs/group/groupAction'

function DrawGeofenceForm(props) {
  const { formik } = props

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Custom Styles
  const styles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  const router = useRouter

  const stopIdleOptions = [
    { id: '1', label: '50' },
    { id: '2', label: '100' },
    { id: '3', label: '130' }
  ]

  const vehicleGroupsOptions = [
    { value: 1, label: 'Vehicle Group 1' },
    { value: 2, label: 'Vehicle Group 2' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  // ** States and Selectors

  // ** Geofence Type List -->
  const { getAllGeofenceTypesList } = useSelector(state => state.geofence)

  const geofenceTypeList = getAllGeofenceTypesList.data?.map(list => {
    return {
      value: list.id,
      label: list.name
    }
  })

  // ** Zones List
  const { getAllZoneList } = useSelector(state => state.zone)

  const zoneList = getAllZoneList.data?.map(list => {
    return {
      value: list.id,
      label: list.name
    }
  })

  // ** Users List -->
  const { getAllUsersList } = useSelector(state => state.users)

  const usersList = getAllUsersList.data?.map(list => {
    return {
      value: list.id,
      label: list.name
    }
  })

  // ** Assets List -->
  const { getAllAssetList } = useSelector(state => state.assets)

  const assetList = getAllAssetList?.data?.map(asset => {
    return {
      label: asset.name,
      value: asset.id
    }
  })

  // ** Vehicle Groups -->
  const { getAllGroupList, loading } = useSelector(state => state.group)

  const groupList = getAllGroupList?.data?.map(group => {
    return {
      label: group.name,
      value: group.id
    }
  })
  console.log(groupList)

  // ** Fetching Data

  // ** Geofence Type -->
  useEffect(() => {
    dispatch(getAllGeofenceTypeAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Zone -->
  useEffect(() => {
    dispatch(getAllZoneAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Users -->
  useEffect(() => {
    dispatch(getAllUsersAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Assets -->
  useEffect(() => {
    dispatch(getAllAssetAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Vehicle Groups -->
  useEffect(() => {
    dispatch(getAllGroupAction({ page: 1, limit: 'all' }))
  }, [router])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Address</TextLabel>
              <TextInput
                disabled
                fullWidth
                max={10}
                id='address'
                name='address'
                type='text'
                variant='outlined'
                placeholder='Enter Address'
                className={styles.TextField}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                inputProps={{
                  style: { borderColor: !!formik.touched.address && !!formik.errors.address && 'red !important' }
                }}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Name</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='name'
                name='name'
                type='text'
                variant='outlined'
                placeholder='Name'
                className={styles.TextField}
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                defaultValue={false}
                value={formik?.values.history}
                onChange={() => formik.setFieldValue('history', !formik?.values.history)}
              />
            }
            label={
              <Typography sx={{ fontWeight: '500', textAlign: 'center', color: '#4B5563' }}>
                Select From History
              </Typography>
            }
          />
        </Grid>

        {formik?.values.history && (
          <>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>Asset</TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset'
                  name='asset'
                  options={assetList}
                  getOptionLabel={option => option.label}
                  onChange={formik.handleChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset && formik.errors.asset && '#E53E3E !important'
                    }
                  }}
                  value={assetOptions?.find(asset => asset.label === formik.values.asset)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset'
                      error={formik.touched.asset && Boolean(formik.errors.asset)}
                      helperText={formik.touched.asset && formik.errors.asset}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container direction='column'>
                <Grid item xs={12} mb={1}>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>From Date</TextLabel>
                </Grid>
                <Grid item xs={12}>
                  <DatePickerWrapper
                    sx={{
                      '& input': { borderColor: formik.touched.date_from && Boolean(formik.errors.date_from) && 'red' }
                    }}
                  >
                    <DatePicker
                      selected={formik.values.date_from}
                      name='date_from'
                      id='date_from'
                      placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                      className={datepickerStyles.datepicker}
                      onChange={date => formik.setFieldValue('date_from', date)}
                      dateFormat='yyyy-MM-dd'
                    />
                  </DatePickerWrapper>
                  {formik.errors.date_from && (
                    <TextField
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.date_from && Boolean(formik.errors.date_from)}
                      helperText={formik.touched.date_from && formik.errors.date_from}
                      sx={{
                        '& .MuiInputBase-root': {
                          display: 'none'
                        }
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container direction='column'>
                <Grid item xs={12} mb={1}>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>To Date</TextLabel>
                </Grid>
                <Grid item xs={12}>
                  <DatePickerWrapper
                    sx={{
                      '& input': { borderColor: formik.touched.date_to && Boolean(formik.errors.date_to) && 'red' }
                    }}
                  >
                    <DatePicker
                      selected={formik.values.date_to}
                      name='date_to'
                      type='date'
                      id='date_to'
                      placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                      className={datepickerStyles.datepicker}
                      onChange={date => formik.setFieldValue('date_to', date)}
                      dateFormat='yyyy-MM-dd'
                    />
                  </DatePickerWrapper>
                  {formik.errors.date_to && (
                    <TextField
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.date_to && Boolean(formik.errors.date_to)}
                      helperText={formik.touched.date_to && formik.errors.date_to}
                      sx={{
                        '& .MuiInputBase-root': {
                          display: 'none'
                        }
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container direction='column'>
                <Grid item xs={12} mb={1}>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>From Time</TextLabel>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id='time_from'
                    name='time_from'
                    variant='outlined'
                    displayEmpty
                    value={formik.values.time_from}
                    onChange={(e, value) => {
                      formik.setFieldValue('time_from', e.target.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.time_from && formik.errors.time_from && '#E53E3E !important'
                      }
                    }}
                    className={styles.Select}
                  >
                    {timeOptions.map((name, index) =>
                      index === 0 ? (
                        <MenuItem key={name} value=''>
                          <PlaceholderText>12:00 am</PlaceholderText>
                        </MenuItem>
                      ) : (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {formik.errors.time_from && (
                    <TextField
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.time_from && Boolean(formik.errors.time_from)}
                      helperText={formik.touched.time_from && formik.errors.time_from}
                      sx={{
                        '& .MuiInputBase-root': {
                          display: 'none'
                        }
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container direction='column'>
                <Grid item xs={12} mb={1}>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>To Time</TextLabel>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id='time_to'
                    name='time_to'
                    variant='outlined'
                    displayEmpty
                    value={formik.values.time_to}
                    onChange={(e, value) => {
                      formik.setFieldValue('time_to', e.target.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.time_to && formik.errors.time_to && '#E53E3E !important'
                      }
                    }}
                    className={styles.Select}
                  >
                    {timeOptions.map((name, index) =>
                      index === 0 ? (
                        <MenuItem key={name} value=''>
                          <PlaceholderText>12:00 am</PlaceholderText>
                        </MenuItem>
                      ) : (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {formik.errors.time_to && (
                    <TextField
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.time_to && Boolean(formik.errors.time_to)}
                      helperText={formik.touched.time_to && formik.errors.time_to}
                      sx={{
                        '& .MuiInputBase-root': {
                          display: 'none'
                        }
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} my={2}>
              <ButtonIcon
                sx={{ width: '100%' }}
                color='success'
                iconWidth={30}
                iconHeight={'auto'}
                onClick={formik.handleSubmit}
              >
                Load
              </ButtonIcon>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={12}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>Stop/Idle Points</TextLabel>
                  <Autocomplete
                    fullWidth
                    id='stop_idle'
                    name='stop_idle'
                    options={stopIdleOptions}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('stop_idle_points', e.target.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          formik.touched.stop_idle_points && formik.errors.stop_idle_points && '#E53E3E !important'
                      }
                    }}
                    value={stopIdleOptions?.find(poi => poi.label === formik.values.stop_idle_points)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Stop/Idle Points'
                        error={formik.touched.stop_idle_points && Boolean(formik.errors.stop_idle_points)}
                        helperText={formik.touched.stop_idle_points && formik.errors.stop_idle_points}
                      />
                    )}
                    className={styles.AutoCompleteSelect}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={6}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Type</TextLabel>
              <Autocomplete
                fullWidth
                id='type'
                name='type'
                options={geofenceTypeList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('type', value?.value || '')
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.type && formik.errors.type && '#E53E3E !important'
                  }
                }}
                value={geofenceTypeList?.find(customer => customer.value === parseInt(formik.values.type))}
                renderInput={params => <TextField {...params} variant='outlined' placeholder='Search Geofence Type' />}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Zone</TextLabel>
              <Autocomplete
                fullWidth
                id='zone'
                name='zone'
                options={zoneList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('zone', value?.value || '')
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.zone && formik.errors.zone && '#E53E3E !important'
                  }
                }}
                value={zoneList?.find(customer => customer.value === parseInt(formik.values.zone))}
                renderInput={params => <TextField {...params} variant='outlined' placeholder='Search Zone' />}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Speed</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='speed'
                name='speed'
                type='number'
                variant='outlined'
                placeholder='Speed'
                className={styles.TextField}
                {...formik.getFieldProps('speed')}
                error={formik.touched.speed && Boolean(formik.errors.speed)}
                helperText={formik.touched.speed && formik.errors.speed}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Description</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='description'
                name='description'
                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Description'
                className={styles.TextField}
                {...formik.getFieldProps('description')}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Users</TextLabel>
              <Autocomplete
                fullWidth
                id='user'
                name='user'
                options={usersList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('user', value?.value || '')
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.user && formik.errors.user && '#E53E3E !important'
                  }
                }}
                value={usersList?.find(customer => customer.value === parseInt(formik.values.user))}
                renderInput={params => <TextField {...params} variant='outlined' placeholder='Search Users' />}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Vehicle Groups</TextLabel>
              <Autocomplete
                fullWidth
                id='vehicle_group'
                name='vehicle_group'
                options={groupList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('vehicle_group', value?.value || '')
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.vehicle_group && formik.errors.vehicle_group && '#E53E3E !important'
                  }
                }}
                value={groupList?.find(customer => customer.value === parseInt(formik.values.vehicle_group))}
                renderInput={params => <TextField {...params} variant='outlined' placeholder='Search Vehicle Groups' />}
                className={styles.AutoCompleteSelect}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign='right' sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <ButtonIcon
            sx={{ width: 120 }}
            color='grey'
            iconWidth={30}
            iconHeight={'auto'}
            startIcon={'pepicons-pop:times'}
            onClick={formik.handleSubmit}
          >
            Reset
          </ButtonIcon>

          <ButtonIcon
            sx={{ width: 120 }}
            color='success-outlined'
            iconWidth={30}
            iconHeight={'auto'}
            onClick={formik.handleSubmit}
          >
            Save
          </ButtonIcon>
        </Grid>
      </Grid>
    </form>
  )
}

export default DrawGeofenceForm
