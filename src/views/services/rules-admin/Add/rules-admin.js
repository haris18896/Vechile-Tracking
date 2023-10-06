import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  ListItem,
  Typography
} from '@mui/material'

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
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper } from 'src/styles/pages/services'
import Modal from './modal'
import AlertModal from './alertModal'

function RulesAdminForm({ slug, onChangeHandler, customers, formik }) {
  const styles = useCommonStyles()
  const dateStyles = useDatepickerStyles()

  // ========= State ========== //
  const [showAlert, setShowAlert] = useState(false)
  const [vehicleModal, setVehicleModal] = useState(false)

  // ========= Options =========

  const assetOptions = [
    { label: 'Select', value: '' },
    { label: 'Asset1', value: 'asset-11' },
    { label: 'Asset2', value: 'asset-12' }
  ]

  const accountOptions = customers?.map(customer => {
    return {
      label: customer.account,
      value: customer.id
    }
  })

  const predefinedOptions = []

  const intervalOptions = []

  const activeOptions = [
    {
      label: 'Yes',
      value: 'yes'
    },
    {
      label: 'No',
      value: 'no'
    }
  ]

  const ruleOptions = [
    {
      label: '5min',
      value: '5min'
    },
    {
      label: '15min',
      value: '15min'
    }
  ]

  // ========= ALERTS HANDLERS ==========
  const handleShow = setState => {
    setState(true)
  }

  const handleSubmit = () => {
    // setShowAlert(false)
  }

  const handleClose = setState => {
    setState(false)
  }

  // =========== DATA ===========
  const parameters = [
    {
      label: 'Asset No.',
      value: 'assetNo'
    },
    {
      label: 'Speed',
      value: 'speed'
    },
    {
      label: 'Distance',
      value: 'distance'
    },
    {
      label: 'Location',
      value: 'location'
    },
    {
      label: 'Temperature',
      value: 'temperature'
    }
  ]

  const vehicles = [{ name: '3575 VAB' }, { name: '4573 CAA' }, { name: '5633 DDA' }, { name: '2122 MNS' }]

  const alertDetails = [
    {
      label: 'Harsh Braking',
      value: 'harsh_breaking'
    },

    {
      label: 'Trip Distance Travelled',
      value: 'trip_distance_travelled'
    },
    {
      label: 'Harsh Acceleration',
      value: 'harsh_acceleration'
    },
    {
      label: 'Seatbelt',
      value: 'seatbelt'
    },
    {
      label: 'Send Last Position at Fixed Interval',
      value: 'last_position'
    },
    {
      label: 'Working out of Hours',
      value: 'working_hours'
    },
    {
      label: 'OBD Fault Codes',
      value: 'obd_codes'
    },
    {
      label: 'Asset Stopped Reporting',
      value: 'asset_stop_report'
    },
    {
      label: 'Tire Change Reminder',
      value: 'tire_change_reminder'
    },
    {
      label: 'Stopped Out of Geofence',
      value: 'stopped_geofence'
    },
    {
      label: 'Oil Change Reminder',
      value: 'oil_change_reminder'
    },
    {
      label: 'Overspeeding',
      value: 'overspeeding'
    },
    {
      label: 'Ignition',
      value: 'ignition'
    },
    {
      label: 'Inside Geofence',
      value: 'inside_geofence'
    },
    {
      label: 'Panic',
      value: 'panic'
    },
    {
      label: 'Input On/Off',
      value: 'input_toggle'
    },
    {
      label: 'Area Wise Speed Violation',
      value: 'area_speed_violation'
    },
    {
      label: 'Temperature Monitoring',
      value: 'temperature_monitoring'
    },
    {
      label: 'Power Cut',
      value: 'power_cut'
    },
    {
      label: 'Fuel Increase',
      value: 'fuel_increase'
    },
    {
      label: 'BLE Temp/Humidity',
      value: 'ble_temp'
    },
    {
      label: 'Fuel Drop',
      value: 'fuel_drop'
    },
    {
      label: 'Excessive Idling',
      value: 'excessive_idling'
    },
    {
      label: 'Geofence Arrival/Departure',
      value: 'geofence_arrival_departure'
    }
  ]

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={{ md: 20 }} alignItems='flex-end'>
        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500' }} mb={2}>
            Account<Required>*</Required>
          </Typography>
          <Autocomplete
            fullWidth
            id='account'
            name='account'
            options={accountOptions || []}
            onChange={(event, value) => {
              formik.setFieldValue('account', value?.label)
            }}
            value={
              formik.values.account
                ? accountOptions
                  ? accountOptions.find(data => data.label === formik.values.account)?.label
                  : ''
                : ''
            }
            sx={{
              '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
              },
              marginTop: 1
            }}
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
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Email Subject<Required>*</Required>
          </Typography>
          <TextField
            name='email_subject'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.email_subject && Boolean(formik.errors.email_subject)}
            helperText={formik.touched.email_subject && formik.errors.email_subject}
            placeholder='Enter Email Subject'
            {...formik.getFieldProps('email_subject')}
            sx={{ marginTop: 1 }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Alert Name<Required>*</Required>
          </Typography>
          <TextField
            name='alert_name'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.alert_name && Boolean(formik.errors.alert_name)}
            helperText={formik.touched.alert_name && formik.errors.alert_name}
            placeholder='Enter Alert Name'
            {...formik.getFieldProps('alert_name')}
            sx={{ marginTop: 1 }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Select Parameter
          </Typography>
          <Grid container>
            {parameters?.map(parameter => (
              <Grid item xs={6} md={4} xl={3} key={parameter.value}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultValue={false}
                      value={formik.values?.[parameter.value]}
                      onChange={() => formik.setFieldValue([parameter.value], !formik.values?.[parameter.value])}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}>
                      {parameter.label}
                    </Typography>
                  }
                />{' '}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextLabel sx={{ marginBottom: '0.25rem' }}>Alert Selector</TextLabel>

          <Grid item sx={{ display: 'flex', gap: '10px' }} alignItems='center'>
            <Button
              variant='contained'
              component='label'
              sx={{
                background: '#FF8B00',
                borderRadius: '50px',
                boxShadow: 'none',
                '&.MuiButtonBase-root:hover': {
                  backgroundColor: '#e57d00'
                }
              }}
              onClick={() => handleShow(setShowAlert)}
            >
              <Icon icon='material-symbols:toggle-off' fontSize={30} style={{ marginRight: 10 }} />
              Alert Settings
            </Button>
          </Grid>

          <Grid item xs={12} mt={4}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
              Notification Email<Required>*</Required>
            </Typography>
            <TextField
              name='notification_email'
              id='outlined-basic'
              variant='outlined'
              className={styles.TextField}
              error={formik.touched.notification_email && Boolean(formik.errors.notification_email)}
              helperText={formik.touched.notification_email && formik.errors.notification_email}
              placeholder='Enter Notification Email'
              {...formik.getFieldProps('notification_email')}
              sx={{ marginTop: 1 }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Email Message<Required>*</Required>
          </Typography>
          <TextField
            name='email_message'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextArea}
            error={formik.touched.email_message && Boolean(formik.errors.email_message)}
            helperText={formik.touched.email_message && formik.errors.email_message}
            placeholder='Enter Email Message'
            {...formik.getFieldProps('email_message')}
            rows={5}
            multiline
            sx={{ marginTop: 1 }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Notification Mobile
          </Typography>
          <TextField
            name='notification_mobile'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.notification_mobile && Boolean(formik.errors.notification_mobile)}
            helperText={formik.touched.notification_mobile && formik.errors.notification_mobile}
            placeholder='Enter Mobile No.'
            {...formik.getFieldProps('notification_mobile')}
            sx={{ marginTop: 1 }}
          ></TextField>

          <Grid item xs={12} mt={5}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
              System Rule
            </Typography>
            <Autocomplete
              fullWidth
              id='system_rule'
              name='system_rule'
              options={ruleOptions || []}
              value={
                formik.values.system_rule
                  ? ruleOptions
                    ? ruleOptions.find(data => data.value === formik.values.system_rule)
                    : ''
                  : ''
              }
              sx={{
                '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.system_rule && formik.errors.system_rule && '#E53E3E !important'
                },
                marginTop: 1
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Rule'
                  error={formik.touched.system_rule && Boolean(formik.errors.system_rule)}
                  helperText={formik.touched.system_rule && formik.errors.system_rule}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('system_rule', newValue?.value)
              }}
              className={styles.AutoCompleteSelect}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            SMS Message
          </Typography>
          <TextField
            name='sms_message'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextArea}
            error={formik.touched.sms_message && Boolean(formik.errors.sms_message)}
            helperText={formik.touched.sms_message && formik.errors.sms_message}
            placeholder='Enter SMS'
            {...formik.getFieldProps('sms_message')}
            rows={5}
            multiline
            sx={{ marginTop: 1 }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Active<Required>*</Required>
          </Typography>
          <Autocomplete
            fullWidth
            id='active'
            name='active'
            options={activeOptions || []}
            value={
              formik.values.active
                ? activeOptions
                  ? activeOptions.find(data => data.label === formik.values.active)
                  : ''
                : ''
            }
            sx={{
              '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.active && formik.errors.active && '#E53E3E !important'
              },
              marginTop: 1
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Please Select'
                error={formik.touched.active && Boolean(formik.errors.active)}
                helperText={formik.touched.active && formik.errors.active}
              />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('active', newValue?.label)
            }}
            className={styles.AutoCompleteSelect}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextLabel sx={{ marginBottom: '0.25rem' }}>Vehicles</TextLabel>

          <Grid item sx={{ display: 'flex', gap: '10px' }} alignItems='center'>
            <Button
              variant='contained'
              component='label'
              sx={{
                background: '#FF8B00',
                borderRadius: '50px',
                boxShadow: 'none',
                '&.MuiButtonBase-root:hover': {
                  backgroundColor: '#e57d00'
                }
              }}
              onClick={() => handleShow(setVehicleModal)}
            >
              <Icon icon={'ion:car-sport'} fontSize={30} style={{ marginRight: 10 }} />
              Assign Vehicle
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Cron Rule<Required>*</Required>
          </Typography>
          <Autocomplete
            fullWidth
            id='cron_rule'
            name='cron_rule'
            options={ruleOptions || []}
            value={
              formik.values.cron_rule
                ? ruleOptions
                  ? ruleOptions.find(data => data.label === formik.values.cron_rule)
                  : ''
                : ''
            }
            sx={{
              '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.cron_rule && formik.errors.cron_rule && '#E53E3E !important'
              },
              marginTop: 1
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select Rule'
                error={formik.touched.cron_rule && Boolean(formik.errors.cron_rule)}
                helperText={formik.touched.cron_rule && formik.errors.cron_rule}
              />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('cron_rule', newValue?.label)
            }}
            className={styles.AutoCompleteSelect}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            By Asset ID<Required>*</Required>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Autocomplete
              fullWidth
              id='asset_id'
              name='asset_id'
              options={assetOptions || []}
              value={
                formik.values.asset_id
                  ? assetOptions
                    ? assetOptions.find(data => data.value === formik.values.asset_id)
                    : ''
                  : ''
              }
              sx={{
                '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                },
                '&.MuiAutocomplete-root': {
                  flex: 1
                },

                marginTop: 1
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='No Vehicles (Select By Groups)'
                  error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                  helperText={formik.touched.asset_id && formik.errors.asset_id}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('asset_id', newValue?.value)
              }}
              className={styles.AutoCompleteSelect}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultValue={false}
                  value={formik.values?.all_assets}
                  onChange={() => formik.setFieldValue('all_assets', !formik.values?.all_assets)}
                />
              }
              label={
                <Typography sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}>
                  All
                </Typography>
              }
              sx={{ '&.MuiFormControlLabel-root': { marginRight: 0, marginLeft: 2 } }}
            />{' '}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Description<Required>*</Required>
          </Typography>
          <TextField
            name='description'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            placeholder='Enter Description'
            {...formik.getFieldProps('description')}
            sx={{ marginTop: 1 }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5} visibility='hidden' display={{ xs: 'none', sm: 'block' }}></Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Box mb={4}>
            <Typography variant='body' sx={{ fontWeight: '500' }}>
              Trigger Action
            </Typography>
            <Grid container>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultValue={false}
                      value={formik.values?.email_check}
                      onChange={() => formik.setFieldValue('email_check', !formik.values?.email_check)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#556485',
                        fontSize: { xs: '0.9rem', xl: '1rem' }
                      }}
                    >
                      Email
                    </Typography>
                  }
                />{' '}
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultValue={false}
                      value={formik.values?.save_alert_check}
                      onChange={() => formik.setFieldValue('save_alert_check', !formik.values?.save_alert_check)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#556485',
                        fontSize: { xs: '0.9rem', xl: '1rem' }
                      }}
                    >
                      Save/Alert
                    </Typography>
                  }
                />{' '}
              </Grid>
            </Grid>
          </Box>

          {/* // Push Notification */}
          <Box mb={4}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
              Send Push Notification
            </Typography>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultValue={false}
                    value={formik.values?.push_notification_check}
                    onChange={() =>
                      formik.setFieldValue('push_notification_check', !formik.values?.push_notification_check)
                    }
                  />
                }
              />
            </Grid>
          </Box>

          {/* // SMS Notification */}

          <Box mb={4}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
              SMS Notification
            </Typography>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultValue={false}
                    value={formik.values?.sms_notification_check}
                    onChange={() =>
                      formik.setFieldValue('sms_notification_check', !formik.values?.sms_notification_check)
                    }
                  />
                }
              />
            </Grid>
          </Box>

          {/* // Desktop Notification */}

          <Box mb={4}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
              Desktop Notification
            </Typography>

            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultValue={false}
                    value={formik.values?.desktop_notification_check}
                    onChange={() =>
                      formik.setFieldValue('desktop_notification_check', !formik.values?.desktop_notification_check)
                    }
                  />
                }
              />
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5} visibility='hidden' display={{ xs: 'none', sm: 'block' }}></Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Alert Interval<Required>*</Required>
          </Typography>
          <Autocomplete
            fullWidth
            id='alert_interval'
            name='alert_interval'
            options={intervalOptions || []}
            value={
              formik.values.alert_interval
                ? intervalOptions
                  ? intervalOptions.find(data => data.value === formik.values.alert_interval)
                  : ''
                : ''
            }
            sx={{
              '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.alert_interval && formik.errors.alert_interval && '#E53E3E !important'
              },
              marginTop: 1
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select Rule'
                error={formik.touched.alert_interval && Boolean(formik.errors.alert_interval)}
                helperText={formik.touched.alert_interval && formik.errors.alert_interval}
              />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('alert_interval', newValue?.value)
            }}
            className={styles.AutoCompleteSelect}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5} visibility='hidden' display={{ xs: 'none', sm: 'block' }}></Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
            Predefined Action
          </Typography>
          <Autocomplete
            fullWidth
            id='predefined_actions'
            name='predefined_actions'
            options={predefinedOptions || []}
            value={
              formik.values.predefined_actions
                ? predefinedOptions
                  ? predefinedOptions.find(data => data.value === formik.values.predefined_actions)
                  : ''
                : ''
            }
            sx={{
              '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor:
                  formik.touched.predefined_actions && formik.errors.predefined_actions && '#E53E3E !important'
              },
              marginTop: 1
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select Predefined Action'
                error={formik.touched.predefined_actions && Boolean(formik.errors.predefined_actions)}
                helperText={formik.touched.predefined_actions && formik.errors.predefined_actions}
              />
            )}
            onChange={(event, newValue) => {
              formik.setFieldValue('predefined_actions', newValue?.value)
            }}
            className={styles.AutoCompleteSelect}
          />
        </Grid>
      </Grid>

      <Modal
        open={vehicleModal}
        handleClose={() => handleClose(setVehicleModal)}
        handleSubmit={handleSubmit}
        title='Assign Vehicle'
        vehicles={vehicles}
      />

      <AlertModal
        open={showAlert}
        handleClose={() => handleClose(setShowAlert)}
        handleSubmit={handleSubmit}
        title='Alert Selector Details'
        alertDetails={alertDetails}
        formik={formik}
      />
    </ServicesWrapper>
  )
}

export default RulesAdminForm

RulesAdminForm.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
