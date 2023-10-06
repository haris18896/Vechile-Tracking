import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Checkbox, FormControlLabel, ListItem, Menu, Typography } from '@mui/material'

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
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/reports'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import Modal from '../modal'
import { exportOptions } from 'src/utilities/utils'
import EmailModal from 'src/components/Dialogs/EmailModal'
import { TableUIContext } from 'src/contexts/TableContext'

function DataConsumptionHeader({ slug, customers }) {
  const { getTableHeight, showTableData, tableData } = useContext(TableUIContext)
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})
  const [err, setErr] = useState('')
  const headerRef = useRef()

  // Passing Header to find Table height
  getTableHeight(headerRef)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Handle Submit
  const handleSubmit = email => {
    if (!email) {
      setErr('Email is required')
    } else {
      handleClose()
    }
  }

  // ** Form Validation
  const schema = Yup.object().shape({
  })

  // ** Form Values
  const [inputValues, setInputValues] = useState({
    account: '',
    assetName: '',
    all : false,
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: ''
  });

  const onChangeHandler = (name, value) => {
    setInputValues({...inputValues, [name]: value})
  }

  // ========= Options =========

  // let accountOptions = customers?.map(item => {
  //   return { id: item.customer_type.id, label: item.customer_type.name }
  // })

  // let assetOptions = customers?.map(item => {
  //   return { id: item.id, label: item.company_name }
  // })

  let accountOptions = [
    {id:'0', label: "Account 1"},
    {id:'1', label: "Account 2"},
    {id:'2', label: "Account 3"}
  ]

  let assetOptions = [
    {id:'0', label: "Asset 1"},
    {id:'1', label: "Asset 2"},
    {id:'2', label: "Asset 3"}

  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']


  //Export Options
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


  // Destructuring values
  const { account, assetName, all, from_date, to_date, from_time, to_time  } = inputValues

  return (
    <ReportsWrapper className='report-wrapper' bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1, marginBottom: { xs: !tableData && "4rem", md: '0'} }}>
        <Grid container rowSpacing={5} columnSpacing={6} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={10} lg={8} xl={7} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Grid container rowSpacing={3} alignItems='center'>
                  <Grid item xs={12} sm={9}>
                  <Autocomplete
                  id='account'
                  name='account'
                  options={accountOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e,value) => onChangeHandler("account", value)}
                  value={accountOptions?.find(account => account.name === account)}
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

                  <Grid item xs={12} sm={9}>
                  <Autocomplete
                  id='assetName'
                  name='assetName'
                  options={assetOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e,value) => onChangeHandler("assetName", value)}
                  value={assetOptions?.find(asset => asset.name === assetName)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Asset Name'
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
                  </Grid>

                  <Grid item xs={12} md={3} pl={3}>
                    <FormControlLabel
                      control={<Checkbox defaultValue={false} />}
                      label={<Typography sx={{ fontWeight: '600', textAlign: 'center' }}>All</Typography>}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Grid container alignItems='center' rowSpacing={1} mb={3}>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' mr={2}>
                      From Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={7.5}>
                  <DatePickerWrapper>
                    <DatePicker
                        selected={from_date}
                        id=''
                        className={datepickerStyles.datepicker}
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        onChange={(date) => onChangeHandler("from_date", date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>

                <Grid container rowSpacing={1} alignItems='center'>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={9} md={7.5}>
                  <DatePickerWrapper>
                    <DatePicker
                        selected={to_date}
                        id=''
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        className={datepickerStyles.datepicker}
                        onChange={(date) => onChangeHandler("to_date", date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Grid container alignItems='center' rowSpacing={1} mb={3}>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center' }}>
                      From Time
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={7.5}>
                  <Select
                      id='customer_type'
                      name='customer_type'
                      variant='outlined'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={from_time}
                      onChange={(e) => onChangeHandler("from_time", e.target.value)}
                      className={customStyles.Select}
                      fullWidth
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
                  </Grid>
                </Grid>

                <Grid container rowSpacing={1} alignItems='center'>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={9} md={7.5}>
                  <Select
                      id='customer_type'
                      name='customer_type'
                      variant='outlined'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={to_time}
                      onChange={(e) => onChangeHandler("to_time", e.target.value)}
                      className={customStyles.Select}
                      fullWidth
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={4} xl={5}>
            <Grid container rowSpacing={4} columnSpacing={3} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={showTableData}>
                  Show
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
                    className={customStyles.exportStyles}
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
            </Grid>
          </Grid>
        </Grid>

        <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
      </Box>
    </ReportsWrapper>

  )
}

export default DataConsumptionHeader

DataConsumptionHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
