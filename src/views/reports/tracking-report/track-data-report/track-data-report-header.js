import React, { useContext, useEffect, useRef, useState } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Menu, TextField, Typography } from '@mui/material'

// ** Third Party Imports
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { PlaceholderText } from 'src/styles/pages/reports'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

// ** Google Map
import { ReportsWrapper } from 'src/styles/pages/reports'
import { exportOptions, isObjEmpty } from 'src/utilities/utils'
import EmailModal from 'src/components/Dialogs/EmailModal'

// ** Table context
import { TableUIContext } from 'src/contexts/TableContext'

// ** Custom Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** Translation (en.json)
import { useTranslation } from 'react-i18next'

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux'
import { resetTrackData } from 'src/store/reports/tracking/trackingReportSlice'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllTrackDataActions } from 'src/store/reports/tracking/trackingReportAction'

// ** Router
import { useRouter } from 'next/router'
import HeaderDatePicker from 'src/components/form-element/HeaderDatePicker'

function TrackDataReportHeader({ onChangeHandler }) {
  // ** Router
  const router = useRouter()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Translation Constants (en.json)
  const { t } = useTranslation()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Getting Table Context and Passing Header Refrence
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  // ** Custome Style Date and Inputs
  const styles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // Handle Submit
  const handleSubmit = email => {}

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Formik Setup For Filter
  const initialValues = {
    asset_id: null,
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: ''
  }

  const isAllowed = (from_date, to_date, from_time, to_time) => !!to_date || !!to_time || !!from_time || from_date

  const Schema = Yup.object().shape(
    {
      from_date: Yup.string()
        .nullable()
        .when(['to_date', 'from_time', 'to_time'], {
          is: isAllowed,
          then: Yup.string().required('From Date is Required')
        }),
      to_date: Yup.string()
        .nullable()
        .when(['from_date', 'from_time', 'to_time'], {
          is: isAllowed,
          then: Yup.string().required('To Date is Required')
        }),
      from_time: Yup.string()
        .nullable()
        .when(['from_date', 'to_date', 'to_time'], {
          is: isAllowed,
          then: Yup.string().required('From Time is Required')
        }),
      to_time: Yup.string()
        .nullable()
        .when(['from_date', 'to_date', 'from_time'], {
          is: isAllowed,
          then: Yup.string().required('To Time is Required')
        })
    },
    [
      ['from_date', 'to_date'],
      ['from_date', 'from_time'],
      ['to_date', 'to_time'],
      ['to_date', 'from_time'],
      ['from_time', 'to_time'],
      ['from_date', 'to_time']
    ]
  )

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    enableReinitialize: true,
    onSubmit: values => {
      console.log(!!values.from_date, isObjEmpty(formik.errors))
      if (!values.from_date && isObjEmpty(formik.errors)) {
        console.log('hello from')
        dispatch(getAllTrackDataActions({ page: 1, limit: 10, asset_id: values?.asset_id }))
      } else if (values.asset_id && values?.from_date && isObjEmpty(formik.errors)) {
        const fromDate = `${values?.from_date} ${values?.from_time}`
        const toDate = `${values?.to_date} ${values?.to_time}`
        console.log('hello')
        dispatch(
          getAllTrackDataActions({
            page: 1,
            limit: 10,
            from_date: fromDate,
            to_date: toDate,
            asset_id: values?.asset_id
          })
        )
      }
    }
  })

  console.log(formik.errors, formik.values.asset_id)

  // ** Clear Input and Api Call
  const clearForm = () => {
    formik.resetForm()
    formik.setFieldValue(asset_id, '')
    dispatch(getAllTrackDataActions({ page: 1, limit: 10 }))
  }

  // ** Selector to Get Asset List
  const assets = useSelector(state => state.assets)

  const assetList = assets?.getAllAssetList?.data?.map(asset => {
    return {
      label: asset.name,
      value: asset.id
    }
  })

  // ** Fetching All Asset List
  useEffect(() => {
    dispatch(getAllAssetAction({ page: 1, limit: 'all' }))
  }, [router])

  // ========= Options =========
  const filterOptions = ['All Data', 'All Data']

  const handleExportOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <ReportsWrapper className='report-wrapper' bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1, marginBottom: { xs: '2rem', md: '0' } }}>
        <form name='track-data-form' onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={5} columnSpacing={7} xs={{ alignItems: 'center' }}>
            <Grid item xs={12} xl={9} flexWrap='wrap'>
              <Grid container rowGap={4} columnGap={3}>
                <Grid item xs={12} sm={4.7} md={3.25}>
                  <Grid container rowSpacing={3} alignItems='center'>
                    <Grid item xs={12} sm={12}>
                      <Autocomplete
                        fullWidth
                        id='asset_id'
                        name='asset_id'
                        options={assetList}
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        getOptionLabel={option => option.label}
                        onChange={(e, value) => {
                          formik.setFieldValue('asset_id', value?.value || '')
                        }}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                          }
                        }}
                        value={
                          !!formik.values?.asset_id
                            ? assetList?.find(customer => customer.value === parseInt(formik.values.asset_id))
                            : null
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant='outlined'
                            placeholder={t('common.placeholder.vehicleAutoComplete')}
                          />
                        )}
                        className={styles.AutoCompleteSelect}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} mt='1.2rem'>
                      <Grid item xs={12}>
                        <Select
                          name='time'
                          variant='outlined'
                          displayEmpty
                          onChange={onChangeHandler}
                          className={styles.Select}
                          value={filterOptions[0]}
                        >
                          {filterOptions.map((name, index) =>
                            index === 0 ? (
                              <MenuItem key={name} value=''>
                                <PlaceholderText> All data </PlaceholderText>
                              </MenuItem>
                            ) : (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={5} md={3.5} alignItems='center' justifyContent='end'>
                  <Grid container alignItems='center' rowSpacing={1} mb={3} justifyContent='end'>
                    <HeaderDatePicker
                      label='From Date'
                      inputName='from-date'
                      selected={formik?.values?.from_date}
                      id='from_date'
                      placeHolder={moment(new Date()).format('DD/MM/YYYY')}
                      className={datepickerStyles.datepicker}
                      onChange={date => {
                        formik.setFieldValue('from_date', date)
                        console.log(moment(date).format('YYYY/MM/DD'))
                      }}
                      formikValue={formik.values.from_date}
                      formikError={formik.errors.from_date}
                      formikTouched={formik.touched.from_date}
                      dateFormat='yyyy-MM-dd'
                      maxDate={new Date(formik?.values?.to_date)}
                    />
                  </Grid>

                  <Grid container rowSpacing={1} alignItems='center' justifyContent='end'>
                    <HeaderDatePicker
                      label='To Time'
                      inputName='to-time'
                      selected={formik?.values?.to_date}
                      id='to_date'
                      placeHolder={moment(new Date()).format('DD/MM/YYYY')}
                      className={datepickerStyles.datepicker}
                      onChange={date => formik.setFieldValue('to_date', date)}
                      dateFormat='yyyy-MM-dd'
                      minDate={new Date(formik?.values?.from_date)}
                      formikValue={formik.values.to_date}
                      formikError={formik.errors.to_date}
                      formikTouched={formik.touched.to_date}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={3.5}>
                  <Grid container alignItems='center' justifyContent='end' rowSpacing={1} mb={3}>
                    <HeaderDatePicker
                      label='From Time'
                      inputName='from-time'
                      showTimeSelect
                      selected={formik?.values?.from_time}
                      showTimeSelectOnly
                      id='from_time'
                      placeHolder={moment(new Date()).format('hh:mm a')}
                      className={datepickerStyles.datepicker}
                      onChange={date => formik.setFieldValue('from_time', date)}
                      dateFormat='hh:mm a'
                      maxTime={moment(formik?.values?.to_time).toDate()}
                      minTime={moment().startOf('day').set({ hour: '00', time: '00' }).toDate()}
                      formikValue={formik.values.from_time}
                      formikError={formik.errors.from_time}
                      formikTouched={formik.touched.from_time}
                    />
                  </Grid>

                  <Grid container rowSpacing={1} alignItems='center' justifyContent='end'>
                    <HeaderDatePicker
                      label='To'
                      inputName='to-time'
                      showTimeSelect
                      selected={formik?.values?.to_time}
                      showTimeSelectOnly
                      placeHolder={moment(new Date()).format('hh:mm a')}
                      className={datepickerStyles.datepicker}
                      onChange={date => {
                        formik.setFieldValue('to_time', date)
                      }}
                      dateFormat='hh:mm a'
                      minTime={moment(formik?.values?.from_time).toDate()}
                      maxTime={moment().endOf('day').set({ hour: '23', time: '30' }).toDate()}
                      formikValue={formik.values.to_time}
                      formikError={formik.errors.to_time}
                      formikTouched={formik.touched.to_time}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={3}>
              <Grid container rowSpacing={4} columnSpacing={3} flexWrap='wrap'>
                <Grid item>
                  <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => formik.handleSubmit()}>
                    Show
                  </ButtonIcon>
                </Grid>

                <Grid item>
                  <ButtonIcon
                    color='grey'
                    sx={{ width: 120 }}
                    iconWidth={25}
                    iconHeight={22}
                    startIcon={'uil:times'}
                    onClick={clearForm}
                  >
                    Clear
                  </ButtonIcon>
                </Grid>

                <Grid item>
                  <div>
                    <ButtonIcon
                      sx={{ width: 120 }}
                      color='primary-outlined'
                      startIcon={'material-symbols:arrow-outward-rounded'}
                      onClick={handleClick}
                    >
                      Export
                    </ButtonIcon>

                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button'
                      }}
                      className={styles.exportStyles}
                    >
                      {exportOptions.map((item, index) => (
                        <MenuItem
                          onClick={handleExportOption}
                          sx={{ width: 120, display: 'flex', alignItems: 'center', gap: '10px' }}
                          key={item.name}
                          data-value={item.name}
                        >
                          {item.icon}
                          {item.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
        </form>
      </Box>
    </ReportsWrapper>
  )
}

export default TrackDataReportHeader
