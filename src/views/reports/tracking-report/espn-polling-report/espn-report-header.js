import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Checkbox, FormControlLabel, ListItem, Menu, Typography } from '@mui/material'

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
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { exportOptions } from 'src/utilities/utils'
import TrackingModal from '../tracking-modal'
import { TableUIContext } from 'src/contexts/TableContext'

function EspnReportHeader({ slug, onChangeHandler, customers, toggleTableData }) {
  const { getTableHeight, showTableData } = useContext(TableUIContext)
  const common = useCommonStyles()
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

  const imeiOptions = [
    { name: 'Select', slug: '' },
    { name: '2313434', slug: 'imei-11' },
    { name: '7672423', slug: 'imei-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  const filterOptions = ['All', 'All', 'Moving']

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

  // Handle Submit
  const handleSubmit = email => {
    if (!email) {
      setErr('Email is required')
    } else {
      handleClose()
    }
  }

  // ========= States =========

  const [values, setValues] = useState({
    imei: '',
    time: ''
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { imei, time } = values

  return (
    <ReportsWrapper className='report-wrapper' bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={5} columnSpacing={6}>
          <Grid item xs={12} md={5} lg={4} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              <Grid item xs={12} sm={6}>
                <Grid container rowSpacing={3} alignItems='center'>
                  <Grid item xs={12}>
                    <Select
                      variant='outlined'
                      displayEmpty
                      value={imei}
                      name='imei'
                      onChange={changeHandler}
                      className={customStyles.Select}
                    >
                      {imeiOptions?.map((data, index) =>
                        index === 0 ? (
                          <MenuItem key={index} value=''>
                            <PlaceholderText>IMEI</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={index} value={data.slug}>
                            {data.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container alignItems='center' rowSpacing={1} mb={3}>
                  <Grid item xs={12} sm={2} md={4} lg={3.5} pr={2}>
                    <Typography variant='body' className='header-label'>
                      Filter
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={10} md={8} lg={8.5}>
                    <Select
                      name='time'
                      variant='outlined'
                      displayEmpty
                      value={time}
                      onChange={onChangeHandler}
                      className={customStyles.Select}
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
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container rowSpacing={4} columnSpacing={3} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={showTableData}>
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

                  // onClick={() => handleOpen()}
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
        <TrackingModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
      </Box>
    </ReportsWrapper>
  )
}

export default EspnReportHeader

EspnReportHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
