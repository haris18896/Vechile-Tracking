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
// ** Third Party Imports
import * as Yup from 'yup'
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
import Modal from '../modal'
import { exportOptions } from 'src/utilities/utils'
import { TableUIContext } from 'src/contexts/TableContext'
import EmailModal from 'src/components/Dialogs/EmailModal'

function GeofenceListHeader({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const { getTableHeight, showTableData, tableData  } = useContext(TableUIContext)

  // ** State
  const [open, setOpen] = useState(false)

  const [err, setErr] = useState('')
  const headerRef = useRef()


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

  // Passing Header to find Table height
  getTableHeight(headerRef)

  // ** Form Validation
  const schema = Yup.object().shape({
    account: Yup.string().required(),
    filter: Yup.string().required(),


  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      account: '',
      filter: '',

    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {

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

  const filterOptions = [
    { name: 'All', slug: '' },
    { name: 'All', slug: 'all' },
    { name: 'Vehicle', slug: 'vehicle' },
    { name: 'User', slug: 'user' }

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
    filter: '',
    assetName : "",
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { trackVal, filter, assetName } = values

  console.log('check', filter)

  return (
    <ReportsWrapper className='report-wrapper' bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1, marginBottom: { xs: !tableData && "4rem", md: '0'} }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={8} lg={7} >
            <Grid container columnSpacing={5} rowSpacing={4}>

              <Grid item xs={12} sm={4} lg={3.5}>
                <Select
                  variant='outlined'
                  displayEmpty
                  value={trackVal}
                  name='trackVal'
                  onChange={changeHandler}
                  className={common.Select}
                  fullWidth
                >
                  {trackDataOptions?.map((data, index) =>
                    index === 0 ? (
                      <MenuItem key={index} value=''>
                        <PlaceholderText>Select Account</PlaceholderText>
                      </MenuItem>
                    ) : (
                      <MenuItem key={index} value={data.slug}>
                        {data.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  alignItems='center'
                  rowSpacing={1}
                >
                  <Grid item xs={12} sm={4}>
                    <Typography variant='body' className='header-label'>
                      Filter
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>

                    <Select
                      variant='outlined'
                      displayEmpty
                      value={filter}
                      name='filter'
                      onChange={changeHandler}
                      className={common.Select}
                      fullWidth
                    >
                      {filterOptions?.map((data, index) =>
                        index === 0 ? (
                          <MenuItem key={index} value=''>
                            <PlaceholderText>Filter</PlaceholderText>
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

              <Grid item xs={12} sm={4} lg={3.5}>
                <Select
                  variant='outlined'
                  displayEmpty
                  value={assetName}
                  name='assetName'
                  onChange={changeHandler}
                  className={common.Select}
                  fullWidth
                  disabled={!filter ? true : false}
                >
                  {trackDataOptions?.map((data, index) =>
                    index === 0 ? (
                      <MenuItem key={index} value=''>
                        <PlaceholderText>{filter === "user" ? "Select User" : "Asset Name" }</PlaceholderText>
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
          <Grid item xs={12} md={4} lg={5}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={showTableData}>
                  Show
                </ButtonIcon>
              </Grid>

              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='grey' iconWidth={25} iconHeight={22} startIcon={'uil:times'}>
                  Clear
                </ButtonIcon>
              </Grid>
              <Grid item>
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
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='primary-outlined'
                  startIcon={'ic:round-email'}
                  onClick={() => handleOpen()}
                >
                  Email
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
    </ReportsWrapper>
  )
}

export default GeofenceListHeader

GeofenceListHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
