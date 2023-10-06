import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material'

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
import {
  PlaceholderText,
  Required,
  SelectItem,
  useCustomStyles,
  useDatepickerStyles
} from 'src/styles/pages/services/edit'

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

function EmailReportManagement({
  slug,
  onChangeHandler,
  address,
  locationSelections,
  mapCenter,
  tableData,
  handleMapClick
}) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({})

  const dispatch = useDispatch()

  // ========= Options =========

  const trackDataOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  // ========= States =========
  const [date, setDate] = useState('')

  const [values, setValues] = useState({
    trackVal: '',
    assetName: '',
    time: ''
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { trackVal, assetName, time } = values

  const center = {
    lat: 24.7136,
    lng: 46.6753
  }

  const columns = [
    {
      name: 'Sequence No',
      selector: row => row.title
    }
  ]

  const columns2 = [
    {
      name: 'Pickup Time',
      selector: row => row.title
    }
  ]

  const data = [
    {
      id: 1,
      title: '12/23/2023',
      year: '1988'
    }
  ]

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container spacing={30}>
        <Grid item xs={12} md={6}>
          <FieldHorizontalWrapper sx={{ alignItems: 'start', width: '100%', gap: '30px' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Account
            </Typography>
            <Select
              id='customer_type'
              name='time'
              variant='outlined'
              sx={{ flex: 1 }}
              displayEmpty
              value={time}
              onChange={onChangeHandler}
              className={customStyles.Select}
            >
              {timeOptions.map((name, index) =>
                index === 0 ? (
                  <MenuItem key={name} value=''>
                    <PlaceholderText>Select Account</PlaceholderText>
                  </MenuItem>
                ) : (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', marginLeft: 'auto', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Asset Name
            </Typography>
            <Select
              id='customer_type'
              name='time'
              variant='outlined'
              sx={{ flex: 1 }}
              displayEmpty
              value={time}
              onChange={onChangeHandler}
              className={customStyles.Select}
            >
              {timeOptions.map((name, index) =>
                index === 0 ? (
                  <MenuItem key={name} value=''>
                    <PlaceholderText>Select Asset Name</PlaceholderText>
                  </MenuItem>
                ) : (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
            <FormControlLabel
              className={customStyles.Check}
              control={<Checkbox defaultValue={false} />}
              label={<Typography sx={{ fontWeight: '700', textAlign: 'center' }}>All</Typography>}
            />
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Report Name
            </Typography>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='Select Report Name'
              sx={{ flex: 1 }}
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', marginLeft: 'auto', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Frequency
            </Typography>
            <Select
              id='customer_type'
              name='address'
              variant='outlined'
              sx={{ flex: 1 }}
              displayEmpty
              value={address}
              onChange={onChangeHandler}
              className={customStyles.Select}
            >
              {locationSelections?.map((item, index) =>
                index === 0 ? (
                  <MenuItem key={item.name} value=''>
                    <PlaceholderText>Daily</PlaceholderText>
                  </MenuItem>
                ) : (
                  <MenuItem key={item} value={item.name}>
                    {item.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FieldHorizontalWrapper>
        </Grid>

        <Grid xs={12} md={6} item>
          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Email ID
            </Typography>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='Enter Email ID'
              sx={{ flex: 1 }}
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              CC
            </Typography>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='CC'
              sx={{ flex: 1 }}
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Email Subject
            </Typography>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='Enter Email Subject'
              sx={{ flex: 1 }}
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper sx={{ gap: '30px', alignItems: 'start', width: '100%' }}>
            <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'right', width: '150px' }}>
              Email Message
            </Typography>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder=''
              sx={{ flex: 1 }}
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextArea}
            ></TextField>
     
          </FieldHorizontalWrapper>

          <FormControlLabel
              sx={{marginLeft: '30px !important'}}
              className={customStyles.Check}
              control={<Checkbox defaultValue={false} />}
              label={<Typography sx={{ fontWeight: '700', textAlign: 'center' }}>Active</Typography>}
            />       

        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default EmailReportManagement

EmailReportManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
