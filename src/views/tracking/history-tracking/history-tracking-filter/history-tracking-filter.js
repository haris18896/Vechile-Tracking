import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, SwipeableDrawer, Tab, Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import moment from 'moment'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
// translate
import { useTranslation } from 'react-i18next'
// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styled Components
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { TrackingMapWrapper } from 'src/styles/pages/tracking'
import { FieldWrapper, HeaderLabel, TextLabel } from 'src/styles/components/input'

import { useDispatch, useSelector } from 'react-redux'

import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'

// ** Third Party Packages
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { getHistoryTrackingAction } from 'src/store/tracking/index/trackingAction'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function HistoryTrackingFilter(props) {
  let { stopNavigation, toggleNavigation } = props
  const cStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const [searchParams, setsearchParams] = useState(null)

  const [playLoop, setplayLoop] = useState(false)

  // ** tracking data
  const { getHistoryTracking } = useSelector(state => state?.tracking)

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Asset Selector
  const assets = useSelector(state => state?.assets?.getAllAssetList?.data)

  // ** Asset List
  const assetList = assets?.map(asset => {
    return {
      value: asset.id,
      label: asset.name
    }
  })

  //speed list
  const speedList = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]

  useEffect(() => {
    // ** Asset info fetch
    dispatch(
      getAllAssetAction({
        page: '1',
        limit: 'all'
      })
    )
  }, [])

  useEffect(() => {
    if (searchParams) {
      dispatch(getHistoryTrackingAction(searchParams))
    }
  }, [searchParams])

  const schema = Yup.object().shape({
    asset_id: Yup.string().required('Asset is required'),
    date_from: Yup.string().required('Starting Date is required'),
    date_to: Yup.string().required('Ending Date is required'),
    time_from: Yup.string().required('Starting Time is required'),
    time_to: Yup.string().required('Ending Time is required'),
    speed: Yup.string().required('Speed is required').nullable()
  })

  const formik = useFormik({
    initialValues: {
      asset_id: '',
      date_from: '',
      date_to: '',
      time_from: '',
      time_to: '',
      speed: { label: 'Medium', value: 'medium' }
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      let params = {
        asset_id: values.asset_id,
        speed: values.speed,
        from_date_time: timeDateFormatter(values.date_from, values.time_from),
        to_date_time: timeDateFormatter(values.date_to, values.time_to),
        limit: 'all'
      }
      setsearchParams(params)
    }
  })

  let timeDateFormatter = (date, time) => {
    let res = `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm:ss')}`

    return res
  }

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      // prevent space character from being entered
      event.preventDefault()
    }
  }

  return (
    <TrackingMapWrapper>
      <Grid item xs={12} sm={12} sx={{ margin: '10px' }}>
        <FieldWrapper>
          <HeaderLabel>{'Add History Details'}</HeaderLabel>
        </FieldWrapper>
      </Grid>
      <Grid item xs={12} md={11} sx={{ margin: '15px' }}>
        <FieldWrapper>
          <TextLabel id='asset-id' sx={{ marginBottom: '0.25rem' }}>
            Asset Name <span style={{ color: 'red' }}>*</span>
          </TextLabel>
          <Autocomplete
            fullWidth
            id='asset_id'
            name='asset_id'
            options={assetList ?? []}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={option => String(option.label)}
            onChange={(e, value) => {
              formik.setFieldValue('asset_id', value?.value)
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
              }
            }}
            value={
              assetList?.find(customer => customer.value === parseInt(formik.values.asset_id)) || null // Set to null or an initial value if no match is found
            }
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select Asset'
                error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                helperText={formik.touched.asset_id && formik.errors.asset_id}
              />
            )}
            className={cStyles.AutoCompleteSelect}
            inputProps={{
              onKeyPress: handleKeyPress
            }}
          />
        </FieldWrapper>
      </Grid>
      <Grid container item xs={12} md={11} sx={{ margin: '15px' }}>
        {/* First DatePickerElement */}
        <Grid item xs={6} sx={{ padding: '0 10px' }}>
          <DatePickerWrapper className='time-picker'>
            <TextLabel id='date_from' sx={{ marginBottom: '0.25rem' }}>
              From Date
            </TextLabel>
            <DatePicker
              minDate={formik.values.from_date}
              fullWidth
              id='date_from'
              showTimeSelect={false}
              name='date_from'
              timeCaption='Date'
              timeIntervals={15}
              selected={formik.values.date_from}
              dateFormat='dd-MM-yyyy'
              className={datepickerStyles.datepicker}
              onChange={newValue => formik.setFieldValue('date_from', newValue)}
            />
          </DatePickerWrapper>
        </Grid>

        {/* Second DatePickerElement */}
        <Grid item xs={6} sx={{ padding: '0 10px' }}>
          <DatePickerWrapper className='time-picker'>
            <TextLabel id='to-time' sx={{ marginBottom: '0.25rem' }}>
              to Date
            </TextLabel>
            <DatePicker
              minDate={formik.values.from_date}
              fullWidth
              id='to-date'
              showTimeSelect={false}
              name='to-date'
              timeCaption='Date'
              timeIntervals={15}
              selected={formik.values.date_to}
              dateFormat='dd-MM-yyyy'
              className={datepickerStyles.datepicker}
              onChange={newValue => formik.setFieldValue('date_to', newValue)}
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={11} sx={{ margin: '15px' }}>
        {/* First DatePickerElement */}
        <Grid item xs={6} sx={{ padding: '0 10px' }}>
          <DatePickerWrapper className='time-picker'>
            <TextLabel id='to-time' sx={{ marginBottom: '0.25rem' }}>
              From time
            </TextLabel>
            <DatePicker
              fullWidth
              id='to-date'
              showTimeSelect
              name='to-time'
              timeCaption='Time'
              showTimeSelectOnly
              timeIntervals={15}
              selected={formik.values.time_from}
              dateFormat='h:mm aa'
              placeholderText='12:00 AM'
              className={datepickerStyles.datepicker}
              onChange={newValue => formik.setFieldValue('time_from', newValue)}
            />
          </DatePickerWrapper>
        </Grid>

        {/* Second DatePickerElement */}
        <Grid item xs={6} sx={{ padding: '0 10px' }}>
          <DatePickerWrapper className='time-picker'>
            <TextLabel id='asset-id' sx={{ marginBottom: '0.25rem' }}>
              till time
            </TextLabel>
            <DatePicker
              fullWidth
              id='to-date'
              showTimeSelect
              name='to-time'
              timeCaption='Time'
              showTimeSelectOnly
              timeIntervals={15}
              selected={formik.values.time_to}
              dateFormat='h:mm aa'
              placeholderText='12:00 AM'
              className={datepickerStyles.datepicker}
              onChange={newValue => formik.setFieldValue('time_to', newValue)}
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item xs={12} md={11} sx={{ margin: '15px' }}>
        <FieldWrapper>
          <TextLabel id='speed' sx={{ marginBottom: '0.25rem' }}>
            Speed <span style={{ color: 'red' }}>*</span>
          </TextLabel>
          <Autocomplete
            fullWidth
            id='speed'
            name='speed'
            options={speedList ?? []}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={option => String(option.label)}
            onChange={(e, value) => {
              formik.setFieldValue('speed', value?.value)
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.speed && formik.errors.speed && '#E53E3E !important'
              }
            }}
            value={
              speedList?.find(customer => customer.value === parseInt(formik.values.speed)) || null // Set to null or an initial value if no match is found
            }
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select speed'
                error={formik.touched.speed && Boolean(formik.errors.speed)}
                helperText={formik.touched.speed && formik.errors.speed}
              />
            )}
            className={cStyles.AutoCompleteSelect}
            inputProps={{
              onKeyPress: handleKeyPress
            }}
          />
        </FieldWrapper>
      </Grid>

      {getHistoryTracking?.data?.length == 0 ? (
        <Grid
          item
          xs={12}
          md={11}
          sx={{
            margin: '15px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap' // Allow flex items to wrap to the next line
          }}
        >
          <Grid
            item
            sx={{
              marginBottom: '15px'
            }}
          >
            <ButtonIcon
              sx={{ width: 150 }}
              color='grey'
              iconWidth={30}
              iconHeight={20}
              startIcon={!isRTL && 'prime:times'}
              endIcon={isRTL && 'prime:times'}
              onClick={() => {}}
            >
              {t('cancel')}
            </ButtonIcon>
          </Grid>
          <Grid item>
            <ButtonIcon
              sx={{ width: 150 }}
              color='success'
              type='submit'
              iconWidth={30}
              iconHeight={'auto'}
              startIcon={!isRTL && 'material-symbols:check-small-rounded'}
              endIcon={isRTL && 'material-symbols:check-small-rounded'}
              onClick={() => {
                formik.handleSubmit()
              }}
            >
              {t('Show')}
            </ButtonIcon>
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          md={11}
          sx={{
            margin: '15px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap' // Allow flex items to wrap to the next line
          }}
        >
          <Grid
            item
            sx={{
              marginBottom: '15px'
            }}
          >
            <ButtonIcon
              sx={{ width: 150 }}
              color='grey'
              iconWidth={30}
              iconHeight={20}
              startIcon={!isRTL && 'prime:times'}
              endIcon={isRTL && 'prime:times'}
              onClick={() => {
                stopNavigation()
              }}
            >
              {t('Stop')}
            </ButtonIcon>
          </Grid>
          <Grid item>
            <ButtonIcon
              sx={{ width: 150 }}
              color='success'
              type='submit'
              iconWidth={30}
              iconHeight={'auto'}
              startIcon={!isRTL && 'material-symbols:check-small-rounded'}
              endIcon={isRTL && 'material-symbols:check-small-rounded'}
              onClick={() => {
                toggleNavigation()
              }}
            >
              {t('Pause/Resume')}
            </ButtonIcon>
          </Grid>
        </Grid>
      )}
    </TrackingMapWrapper>
  )
}

export default HistoryTrackingFilter
