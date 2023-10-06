import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, tableStyles, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'

// import { InputDatePicker, useDatepickerStyles } from 'src/styles/pages/services/edit'

import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper } from 'src/styles/pages/services'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import DataTable from 'react-data-table-component'
import { getAllAccountsAction } from 'src/store/graphs/speed/speedActions'
import { useDispatch, useSelector } from 'react-redux'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

function HistoryTrackTable({ slug, onChangeHandler, address, locationSelections, allOptions, dateHandler, formik }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // Destructuring values

  const { accountOptions, assetOptions, speedOptions, tripEventOptions, routeOptions, timeOptions } = allOptions

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={6} columnSpacing={6} xs={{ alignItems: 'center' }}>
        <Grid item xs={12} flexWrap='wrap'>
          <FieldWrapper>
            <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
              Account
            </TextLabel>
            <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions}
              getOptionLabel={option => option.label}
              onChange={formik.handleChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                }
              }}
              value={accountOptions?.find(account => account.value === formik.values.account)}
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

        <Grid item xs={12}>
          <FieldWrapper>
            <TextLabel sx={{ marginBottom: '0.25rem' }}>Asset</TextLabel>
            <Autocomplete
              fullWidth
              id='asset'
              name='asset'
              options={assetOptions}
              getOptionLabel={option => option.label}
              onChange={formik.handleChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.asset && formik.errors.asset && '#E53E3E !important'
                }
              }}
              value={assetOptions?.find(asset => asset.value === formik.values.asset)}
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

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} mb={1}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Select Route Option</TextLabel>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                id='route_option'
                name='route_option'
                options={routeOptions}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('route_option', value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.route_option && formik.errors.route_option && '#E53E3E !important'
                  }
                }}
                value={formik?.values?.route_option}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select Route Option'
                    variant='outlined'
                    error={formik.touched.route_option && Boolean(formik.errors.route_option)}
                    helperText={formik.touched.route_option && formik.errors.route_option}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} mb={1}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Select Trip Event</TextLabel>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                id='trip_event'
                name='trip_event'
                options={tripEventOptions}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('trip_event', value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.trip_event && formik.errors.trip_event && '#E53E3E !important'
                  }
                }}
                value={formik?.values?.trip_event}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Trip Event'
                    error={formik.touched.trip_event && Boolean(formik.errors.trip_event)}
                    helperText={formik.touched.trip_event && formik.errors.trip_event}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} mb={1}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>Select Speed</TextLabel>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                id='speed'
                name='speed'
                options={speedOptions}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('speed', value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.speed && formik.errors.speed && '#E53E3E !important'
                  }
                }}
                value={formik?.values?.speed}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Speed'
                    error={formik.touched.speed && Boolean(formik.errors.speed)}
                    helperText={formik.touched.speed && formik.errors.speed}
                  />
                )}
                className={styles.AutoCompleteSelect}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HistoryTrackTable

HistoryTrackTable.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
