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
import { PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Box, Checkbox, FormControlLabel, Input, Menu, TextField, Typography } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { IconWrapper } from 'src/styles/pages/catalogs'
import { Icon } from '@iconify/react'
import { useCommonStyles } from 'src/styles/common'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import moment from 'moment'
import { exportOptions } from 'src/utilities/utils'
import EmailModal from 'src/components/Dialogs/EmailModal'

function GprsHeader(props) {
  const { onChangeHandler, customers, values, handleShowData } = props
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState('')
  const styles = useCommonStyles();
  const dateStyles = useDatepickerStyles()


  // Handle Submit
  const handleSubmit = email => {
    if (!email) {
      setErr('Email is required')
    } else {
      handleClose()
    }
  }

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ========= Options =========

  const assetOptions = [
    { label: 'Select', value: '' },
    { label: 'Muhammad Ali', value: 'driver-1' },
    { label: 'Shoaib', value: 'driver-2' }
  ]

  const timeOptions = [
    { label: '10 am', value: '10am' },
    { label: '12 pm', value: '12pm' },
    { label: '5 pm', value: '5pm' },
  ];

  const accountOptions = customers?.map(customer => {
    return {
      label: customer.company_name,
      value: customer.id,
    }
  })

  // Destructuring values
  const { account, asset, from_date, to_date, from_time, to_time, all } = values

    // Export
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
    <ServicesWrapper>
      <Box sx={{flex: 1}}>
      <Grid container xs={{ alignItems: 'center', }} spacing={4}>

          <Grid item sm={2} md={2.5}>
            <Grid container>
          <Grid item >
            <Title>Commands Sent Report</Title>
          </Grid>
          </Grid>
          </Grid>

          <Grid item sm={10} md={9.5}>
          <Grid container rowSpacing={4} columnSpacing={{ sm: 4}}>


            <Grid item xs={12} sm={4} md={3.5}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={9.5} display={{ sm: "flex"}} alignItems="center" width="100%">
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

              <Grid item xs={10.5} sm={9.5} alignItems="center" width="100%">
              <Autocomplete
              fullWidth
              id='asset'
              name='asset'
              options={assetOptions || []}
              onChange={(event, value) => onChangeHandler('asset', value?.value)}
              value={asset ? (assetOptions ? assetOptions.find(data => data.value === asset) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},

              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Asset'
                />
              )}
              className={styles.AutoCompleteSelect}
              />
              </Grid>

              <Grid item xs={1.5} sm={2} display="flex">
            <FormControlLabel
              control={<Checkbox defaultValue={false} value={all} onChange={() => onChangeHandler('all', !all)} />}
              label={<Typography sx={{ fontWeight: '600', textAlign: 'center', color:'#4B5563' }}>All</Typography>}
              sx={{ "&.MuiFormControlLabel-root": {marginRight: 0 },
                    "& .MuiButtonBase-root":{ padding: '0.2rem'}
            }}
            />
            </Grid>
              </Grid>
        </Grid>

        <Grid item xs={12} sm={4} md={3.5}>
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

        <Grid item xs ={12} sm={4}  md={3.5}>
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

        <Grid item>
                    <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => handleShowData()}>
                      Show
                    </ButtonIcon>
        </Grid>

          <Grid item pr={{ xs: 4, sm: 0}}>

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

              <Grid item>
                <ButtonIcon
                  color='primary-outlined'
                  sx={{ width: 120 }}
                  startIcon={'ic:round-email'}
                  onClick={() => handleOpen()}
                >
                  Email
                </ButtonIcon>
              </Grid>

        <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />

          </Grid>
          </Grid>
        </Grid>
        </Box>
    </ServicesWrapper>
  )
}

export default GprsHeader
