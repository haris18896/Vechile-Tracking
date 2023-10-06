import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { IconWrapper, PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Box, Checkbox, FormControlLabel, Input, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { useCommonStyles } from 'src/styles/common'
import DriverKPADashboard from 'src/views/tracking/kpa-dashboard/driver-kpa-dashboard'

function FineManagementHeader(props) {
  const { onChangeHandler, customers, values, redirectURL } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
  const styles = useCommonStyles();
  const router = useRouter()
  const dateStyles = useDatepickerStyles()

  // ========= Options =========

  const driverOptions = [
    { label: 'Select', value: '' },
    { label: 'Muhammad Ali', value: 'driver-1' },
    { label: 'Shoaib', value: 'driver-2' }
  ]

  const timeOptions = [
    { label: '10 am', value: '10am' },
    { label: '12 pm', value: '12pm' },
    { label: '5 pm', value: '5pm' },
  ];

  const accountOptions = customers?.map(data => {
    return {
      label: data.customer,
      value: data.id,
    }
  })

  console.log('accountOptions', accountOptions)

  const vehicleOptions = []

  // Destructuring values
  const { account, driver, from_date, to_date, from_time, to_time } = values

  return (
    <ServicesWrapper>
      <Box sx={{flex: 1}}>
      <Grid container xs={{ alignItems: 'center', }} spacing={4}>

          <Grid item sm={2} md={1.5}>
            <Grid container>
          <Grid item >
            <Title>Fine List</Title>
          </Grid> 
          </Grid>
          </Grid>

          <Grid item sm={10} md={10.5}>
          <Grid container rowSpacing={4} columnSpacing={{ sm: 4}}>
          <Grid item xs={12} sm={4} md={2}>
          <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(event, value) => onChangeHandler('account', value?.value)}
              value={account ? (accountOptions ? accountOptions.find(data => data.value === account) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
            </Grid>
            
          <Grid item xs={12} sm={4} md={2}>
            <Autocomplete
              fullWidth
              id='driver'
              name='driver'
              options={driverOptions || []}
              onChange={(event, value) => onChangeHandler('driver', value?.value)}
              value={driver ? (driverOptions ? driverOptions.find(data => data.value === driver) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Driver'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Autocomplete
              fullWidth
              id='vehicle_id'
              name='vehicle_id'
              options={vehicleOptions || []}
              onChange={(event, value) => onChangeHandler('vehicle_id', value?.value)}
              value={driver ? (vehicleOptions ? vehicleOptions.find(data => data.value === vehicle_id) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Vehicle ID'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

        <Grid item xs={12} sm={4} md={3}>
            <Grid container spacing={4}>
              <Grid item display={{ sm: "flex"}} alignItems="center" width="100%">
              <Typography variant='body' sx={{ fontWeight: '600', flex: 0.5}}>
                From Date 
              </Typography>

              <DatePickerWrapper sx={{ flex: { sm: 1 }, marginLeft: { sm: 2 } }}>
                <DatePicker
                  selected={from_date}
                  id='from_date'
                  className={dateStyles.datepicker}
                  onChange={date => onChangeHandler('from_date', date)}
                  dateFormat='MM/dd/yyyy'
                  placeholderText={moment().format('MM/DD/YYYY')}

                  />
            </DatePickerWrapper>
              </Grid>

              <Grid item display={{ sm: "flex"}} alignItems="center" width="100%">
              <Typography variant='body' sx={{fontWeight: '600', flex: 0.5 }}>
                To Date
              </Typography>

              <DatePickerWrapper sx={{ flex: { sm: 1 }, marginLeft: { sm: 2 } }}>
              <DatePicker
                selected={to_date}
                id='to_date'
                className={dateStyles.datepicker}
                onChange={date => onChangeHandler('to_date', date)}
                dateFormat='MM/dd/yyyy'
                placeholderText={moment().format('MM/DD/YYYY')}
                />
            </DatePickerWrapper>
              </Grid>
              </Grid>
        </Grid>

        <Grid item xs ={12} sm={4}  md={3}>
          <Box sx={{flex: 1}}>
            <Grid container spacing={4}>
              <Grid item display={{ sm: "flex"}} alignItems="center" width="100%">
              <Typography variant='body' sx={{fontWeight: '600', flex: 0.5 }}>
                From Time 
              </Typography>
              <Select
                variant='outlined'
                displayEmpty
                value={from_time}
                name='trackVal'
                onChange={(e) => onChangeHandler("from_time", e.target.value) }
                className={styles.Select}
                sx={{ flex: { sm: 1 }, marginLeft: { sm: 2 } }}
              >
                    <MenuItem value=''>
                      <PlaceholderText>12:00 AM</PlaceholderText>
                    </MenuItem>
                    
                {timeOptions?.map((data, index) =>
          
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                  
                )}
              </Select>
              </Grid>

              <Grid item display={{ sm: "flex"}} alignItems="center" width="100%">
              <Typography variant='body' sx={{fontWeight: '600', flex: 0.5 }}>
                To Time
              </Typography>
              <Select
                variant='outlined'
                displayEmpty
                value={to_time}
                name='to_time'
                onChange={(e) => onChangeHandler("to_time", e.target.value) }
                className={styles.Select}
                sx={{ flex: { sm: 1 }, marginLeft: { sm: 2 } }}
              >
                    <MenuItem value=''>
                      <PlaceholderText>12:00 AM</PlaceholderText>
                    </MenuItem>
                {timeOptions?.map((data, index) =>
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                )}
              </Select>
              </Grid>
              </Grid>
              </Box>
        </Grid>

          <Grid item marginLeft={{ sm: 'auto'}}>
            <IconWrapper bg='#FF8B00' width='40px' height='40px' circle>
              <Icon icon='ic:round-search' width='22px' height='22px' color='#fff' />
            </IconWrapper>
            </Grid>
          
          <Grid item ml={{ xs: 4, sm: 0}}>
          <ButtonIcon
            sx={{ width: 100}}
            color='success'
            startIcon={'ic:round-add'}
            onClick={() => router.push(redirectURL)}
          
          >
            Add
          </ButtonIcon>
          </Grid>
          </Grid>
          </Grid>
        </Grid>
        </Box>
    </ServicesWrapper>
  )
}

export default FineManagementHeader
