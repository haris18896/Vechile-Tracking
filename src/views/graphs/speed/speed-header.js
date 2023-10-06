import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Typography } from '@mui/material'

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
import { useCommonStyles } from 'src/styles/common'
import { PlaceholderText, useCustomStyles } from 'src/styles/pages/graphs'
import { useCustomStyles as CatalogStyles } from 'src/styles/pages/catalogs'

import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllSpeedGraphAction } from 'src/store/graphs/speed/speedActions'

function SpeedHeader({ slug, onChangeHandler, customers, ability, values }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const cStyles = CatalogStyles()
  const datepickerStyles = useDatepickerStyles()

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

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const time = ['12 am', '1 am', '2 am', '3 am']

  // ** Destructure values
  const { account, assetName, all, from_date, to_date, from_time, to_time } = values

  let accountOptions = customers?.map(item => {
    return { id: item.customer_type?.id || 1, label: item.customer_type?.name || '' }
  })

  let assetOptions = customers?.map(item => {
    return { id: item.id, label: item.company_name }
  })

  useEffect(() => {
    // ** Asset info fetch
    dispatch(
      getAllAssetAction({
        page: '1',
        limit: 'all'
      })
    )
  }, [])

  let timeDateFormatter = (date, time) => {
    let res = `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm:ss')}`

    return res
  }

  const schema = Yup.object().shape({
    asset_id: Yup.string().required('Asset is required'),
    date_from: Yup.string().required('Starting Date is required'),
    date_to: Yup.string().required('Ending Date is required'),
    time_from: Yup.string().required('Starting Time is required'),
    time_to: Yup.string().required('Ending Time is required')
  })

  const formik = useFormik({
    initialValues: {
      asset_id: '',
      date_from: '',
      date_to: '',
      time_from: '',
      time_to: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      let params = {
        asset_id: values.asset_id,
        from_date_time: timeDateFormatter(values.date_from, values.time_from),
        to_date_time: timeDateFormatter(values.date_to, values.time_to),
        limit: 50,
        page: 1
      }
      dispatch(getAllSpeedGraphAction(params))
    }
  })

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      // prevent space character from being entered
      event.preventDefault()
    }
  }

  return (
    <GraphsWrapper bordered>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={9} xl={8} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              {/* <Grid item xs={12} sm={6} md={2.5}>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accountOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => onChangeHandler('account', value)}
                  value={accountOptions?.find(account => account.name === account)}
                  renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Account' />}
                  className={styles.AutoCompleteSelect}
                />
              </Grid> */}

              <Grid item xs={12} sm={6} md={2.5}>
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
              </Grid>

              <Grid item xs={12} sm={6} md={3.5}>
                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      From Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
                    <DatePickerWrapper>
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
                </Grid>

                <Grid container alignItems='center'>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={7.5}>
                    <DatePickerWrapper>
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
              </Grid>

              <Grid item xs={12} sm={6} md={3.5}>
                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      From Time
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
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
                  </Grid>
                </Grid>

                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography
                      variant='body'
                      className='header-label'
                      sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center' }}
                    >
                      To
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} lg={3} xl={4}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => formik.handleSubmit()}>
                  Show
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ marginLeft: 0 }}
                  color='primary-outlined'
                  startIcon={'tabler:arrow-narrow-down'}
                  onClick={() => handleOpen()}
                >
                  Download Chart
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </GraphsWrapper>
  )
}

export default SpeedHeader

SpeedHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}

{
  /* <Grid
sx={{
  display: 'flex',
  alignItems: 'center',
  marginLeft: '1rem'
}}
>
<ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => handleOpen()}>
  Show
</ButtonIcon>
<ButtonIcon
  sx={{ marginLeft: 5 }}
  color='primary-outlined'
  startIcon={'tabler:arrow-narrow-down'}
  onClick={() => handleOpen()}
>
  Download Chart
</ButtonIcon>
</Grid> */
}
