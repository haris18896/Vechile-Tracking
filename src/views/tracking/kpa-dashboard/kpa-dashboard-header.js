import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// ** MUI
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Third Party Packages
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import {
  KPADashboardActionsWrapper,
  KPADashboardFiltersWrapper,
  KPADashboardHeaderWrapper,
  KPADashboardStatsWrapper
} from 'src/styles/pages/tracking'
import { IconWrapper } from 'src/styles/pages/services'
import { FieldHorizontalWrapper, FieldWrapper, TextLabel } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCommonStyles } from 'src/styles/common'
import { Icon } from '@iconify/react'

// const KPAStats = dynamic(() => import('src/components/Statistics/KPAStats'))

function KPADashboardHeader(props) {
  const { tab, toDate, toTime, ability, account, fromTime, fromDate, geofence, allGeofence, onChangeHandler } = props

  const datepickerStyles = useDatepickerStyles()
  const styles = useCommonStyles()

  const accounts = [
    {
      value: '1',
      label: 'Account 1'
    },
    {
      value: '2',
      label: 'Account 2'
    },
    {
      value: '3',
      label: 'Account 3'
    }
  ]

  const geofenceOptions = [
    {
      value: '1',
      label: 'Geofence 1'
    },
    {
      value: '2',
      label: 'Geofence 2'
    },
    {
      value: '3',
      label: 'Geofence 3'
    }
  ]

  const [kpaValues, setKpaValues] = useState({
    safety: false,
    vehicle: false,
    driver: false
  })

  const { safety, vehicle, driver } = kpaValues

  const kpaItems = [
    {
      title: 'Safety',
      icon: 'ic:sharp-verified-user',
      color: '#2FC17E',
      hoverColor: '#2fc17e14',
      value: 'safety'
    },

    {
      title: 'Vehicle',
      icon: 'ion:car-sport',
      color: '#FC3B61',
      hoverColor: '#fc3b610d',
      value: 'vehicle'
    },

    {
      title: 'Driver',
      icon: 'ph:steering-wheel-fill',
      color: '#00ABBE',
      value: 'driver',
      hoverColor: '#00abbe1f'
    }
  ]

  return (
    <SettingsWrapper>
      <KPADashboardHeaderWrapper sx={{ justifyContent: { md: 'flex-start', lg: 'flex-start' }, gap: 4 }}>
        <Box>
          <Grid container spacing={2} display='flex'>
            {kpaItems?.map((item, index) => (
              <Grid item key={index}>
                <Button
                  key={item.title}
                  sx={{
                    width: '80px',
                    height: '80px',
                    background: kpaValues[item.value] ? item.color : 'transparent',
                    border: '1px solid #C0C5D0',
                    borderRadius: '5px',
                    margin: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    '&.MuiButtonBase-root:hover': {
                      background: kpaValues[item.value] ? item.color : item.hoverColor
                    }
                  }}
                  onClick={() => setKpaValues({ [item.value]: !kpaValues[item.value] })}
                >
                  <Icon icon={item.icon} width='30' height='30' color={kpaValues[item.value] ? ' #fff' : item.color} />
                </Button>
                <Typography sx={{ textAlign: 'center', fontWeight: '500' }}>{item.title}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ flex: 1, flexBasis: { md: '65%', xl: '33.333%' } }}>
          <Grid container spacing={4} sx={{ justifyContent: { xs: 'center', sm: 'start' } }}>
            <Grid item xs={12} sm={3.5}>
              <FieldWrapper>
                <Autocomplete
                  fullWidth
                  id='account'
                  name='account'
                  options={accounts}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => onChangeHandler('account', newValue?.value)}
                  value={accounts.find(acc => acc.value === account)}
                  renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Account' />}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={4.5}>
              <Grid container alignItems='center'>
                <Grid item xs={12} sm={4} pr={4}>
                  <TextLabel id='from-date' sx={{ whiteSpace: 'unset' }}>
                    From Date
                  </TextLabel>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <DatePickerWrapper>
                    <DatePicker
                      fullWidth
                      id='from-date'
                      name='from-date'
                      selected={fromDate}
                      onChange={date => onChangeHandler('fromDate', date)}
                      dateFormat='dd/MM/yyyy'
                      className={datepickerStyles.datepicker}
                      placeholderText='MM/DD/YYYY'
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container alignItems='center'>
                <Grid item xs={12} sm={2} pr={2} sx={{ whiteSpace: 'unset' }}>
                  <TextLabel id='to-date'>To</TextLabel>
                </Grid>

                <Grid item xs={12} sm={10}>
                  <DatePickerWrapper>
                    <DatePicker
                      fullWidth
                      id='to-date'
                      name='to-date'
                      selected={toDate}
                      onChange={date => onChangeHandler('toDate', date)}
                      dateFormat='dd/MM/yyyy'
                      className={datepickerStyles.datepicker}
                      placeholderText='MM/DD/YYYY'
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={3.5}>
              {vehicle && (
                <FieldWrapper sx={{ display: 'flex', gap: 5 }}>
                  <Autocomplete
                    fullWidth
                    id='geofence'
                    name='geofence'
                    options={geofenceOptions}
                    getOptionLabel={option => option.label}
                    onChange={(event, newValue) => onChangeHandler('geofence', newValue?.value)}
                    value={geofenceOptions.find(acc => acc.value === account)}
                    renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Geofence' />}
                    className={styles.AutoCompleteSelect}
                    sx={{ flex: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultValue={false}
                        value={allGeofence}
                        onChange={() => onChangeHandler('allGeofence', !allGeofence)}
                        sx={{ padding: '0.3rem' }}
                      />
                    }
                    label={<Typography sx={{ fontWeight: '600', textAlign: 'center' }}>All</Typography>}
                    sx={{ float: 'right', marginRight: '0' }}
                  />
                </FieldWrapper>
              )}
            </Grid>

            <Grid item xs={12} sm={4.5}>
              <Grid container alignItems='center'>
                <Grid item xs={12} sm={4} pr={2}>
                  <TextLabel id='from-time' sx={{ whiteSpace: 'unset' }}>
                    From Time
                  </TextLabel>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <DatePickerWrapper className='time-picker'>
                    <DatePicker
                      fullWidth
                      id='from-time'
                      name='from-time'
                      showTimeSelect
                      timeCaption='Time'
                      showTimeSelectOnly
                      timeIntervals={15}
                      selected={fromTime}
                      dateFormat='h:mm aa'
                      placeholderText='12:00 AM'
                      className={datepickerStyles.datepicker}
                      onChange={date => onChangeHandler('fromTime', date)}
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container alignItems='center'>
                <Grid item xs={12} sm={2} pr={2} sx={{ whiteSpace: 'unset' }}>
                  <TextLabel id='to-date'>To</TextLabel>
                </Grid>

                <Grid item xs={12} sm={10}>
                  <DatePickerWrapper className='time-picker'>
                    <DatePicker
                      fullWidth
                      id='to-date'
                      showTimeSelect
                      name='to-time'
                      timeCaption='Time'
                      showTimeSelectOnly
                      timeIntervals={15}
                      selected={toTime}
                      dateFormat='h:mm aa'
                      placeholderText='12:00 AM'
                      className={datepickerStyles.datepicker}
                      onChange={date => onChangeHandler('toTime', date)}
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Grid container spacing={4} display='flex' justifyContent={{ md: 'flex-end', xl: 'flex-start' }}>
            <Grid item>
              <ButtonIcon color='success-outlined' sx={{ width: 120 }} onClick={() => console.log('Clear')}>
                Show
              </ButtonIcon>
            </Grid>

            <Grid item>
              <ButtonIcon
                color='grey'
                sx={{ width: 120 }}
                onClick={() => console.log('Clear')}
                startIcon={'charm:cross'}
              >
                clear
              </ButtonIcon>
            </Grid>
          </Grid>
        </Box>
      </KPADashboardHeaderWrapper>
    </SettingsWrapper>
  )
}

export default KPADashboardHeader
