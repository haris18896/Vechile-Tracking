import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { ListItem, Typography } from '@mui/material'

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
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/pages/services/edit'
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

function PoiManagement({ slug, onChangeHandler, customers }) {
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

  // ** Form Values
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

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

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            width: '100%',
            gap: '20px'
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              flex: '1',
              alignItems: 'center'
            }}
          >
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Account
              </Typography>
              <Select
                id='customer_type'
                name='time'
                variant='outlined'
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

            <FieldHorizontalWrapper
              sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', marginLeft: 'auto', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Asset Name
              </Typography>
              <Select
                id='customer_type'
                name='time'
                variant='outlined'
                displayEmpty
                value={time}
                onChange={onChangeHandler}
                className={customStyles.Select}
              >
                {timeOptions.map((name, index) =>
                  index === 0 ? (
                    <MenuItem key={name} value=''>
                      <PlaceholderText>Select Asset</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Driver Name
              </Typography>
              <TextField
                name='driverName'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Liscence Number
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Total Days Used
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Toll Used
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Toll Charges
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Vehicle Damage Charge
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Total KM
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Traffic Fine
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Total Amount Chargeable
              </Typography>
              <TextField
                name='liscenceNumber'
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              width: '100%'
            }}
            md={6}
          >
            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Mobile No
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Employee ID
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Initial Odometer
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Initial Vehicle Condition
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextArea}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Vehicle Present Condition
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextArea}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Return Date
              </Typography>

              <DatePickerWrapper sx={{ width: '100%' }} className={datepickerStyles.datepicker}>
                <DatePicker
                  selected={date && date}
                  placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                  onChange={date => setDate(date)}
                  dateFormat='yyyy-MM-dd'
                />
              </DatePickerWrapper>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Return Odometer
              </Typography>
              <TextField
                name='returnOdometer'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>
        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default PoiManagement

PoiManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
