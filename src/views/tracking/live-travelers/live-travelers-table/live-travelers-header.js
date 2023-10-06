import React, { useEffect, useState } from 'react'
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
import { exportOptions } from 'src/utilities/utils'
import { TrackingWrapper } from 'src/styles/pages/tracking'

function LiveTravelersHeader({ slug, onChangeHandler, customers, formik, handleChange }) {
  const common = useCommonStyles()
  const styles = useCustomStyles()
  const [CurrentLocation, setCurrentLocation] = useState({})

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

  // Handle Submit
  const handleSubmit = email => {
    if (!email) {
      setErr('Email is required')
    } else {
      handleClose()
    }
  }

  // ========= Options =========

  const accountOptions = [
    { name: 'Select', id: 1 },
    { name: 'Tracking', id: 2 },
    { name: 'Tracking2', id: 3 }
  ]

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

  // ========= States =========
  const [date, setDate] = useState('')

  const [values, setValues] = useState({
    trackVal: '',
    assetName: '',
    time: ''
  })

  // Change Handler
  // const changeHandler = e => {
  //   e.preventDefault()
  //   const { value, name } = e.target
  //   setValues({ ...values, [name]: value })
  // }

  // Destructuring values
  const { trackVal, assetName, time } = values

  return (
    <TrackingWrapper bordered>
      <Box sx={{ flexGrow: 1 }} mt='64px'>
        <Grid container justifyContent='center' spacing={4}>
          <Grid item xs={12} md={5}>
            <Select
              variant='outlined'
              displayEmpty
              value={formik?.values?.account}
              name='account'
              onChange={handleChange}
              className={styles.Select}
              fullWidth
            >
              {accountOptions?.map((data, index) =>
                index === 0 ? (
                  <MenuItem key={index} value=''>
                    <PlaceholderText>Select Account</PlaceholderText>
                  </MenuItem>
                ) : (
                  <MenuItem key={index} value={data.id}>
                    {data.name}
                  </MenuItem>
                )
              )}
            </Select>
          </Grid>

          <Grid item xs={12} md={7}>
            <TextInput
              fullWidth
              id='vehicleName'
              name='vehicleName'
              placeholder='Search by Vehicle Name'
              variant='outlined'
              value={formik?.values?.vehicleName}
              onChange={handleChange}
              className={styles.TextField}
              InputProps={{
                endAdornment: <Icon icon='bx:bx-search' width='20' height='20' />
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </TrackingWrapper>
  )
}

export default LiveTravelersHeader

LiveTravelersHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
