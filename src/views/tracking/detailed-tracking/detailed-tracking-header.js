import React, { useContext, useEffect, useRef, useState } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'
import { Autocomplete, Box, Button, Menu, MenuItem, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

// ** Third Party Packages
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

// ** Custom Style Components
import { TextInput } from 'src/styles/components/input'
import { IconWrapper } from 'src/styles/pages/services'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { InputWrapper, TrackingWrapper } from 'src/styles/pages/tracking'
import { Subtitle, TextWrapper, ContentContainer, Bullet } from 'src/styles/pages/graphs'

// ** Utils
import { exportOptions } from 'src/utilities/utils'

// ** Custom Styles
import { CatalogsWrapper, useCustomStyles } from 'src/styles/pages/catalogs'

// ** Redux Toolkit
import { useDispatch, useSelector } from 'react-redux'

// ** Actions
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllDriversAction } from 'src/store/catalogs/driver/driversActions'
import { TableUIContext } from 'src/contexts/TableContext'

const stats = [
  {
    type: 'Running',
    color: '#2FC17E',
    icon: 'carbon:dot-mark',
    text: '5',
    textColor: '#2EC17E',
    outerColor: '#2FC17E1A'
  },
  {
    type: 'Stopped',
    color: '#FC3B61',
    icon: 'carbon:dot-mark',
    text: '2',
    textColor: '#E53E3E',
    outerColor: '#FC3B611A'
  },
  {
    type: 'Idle  ',
    color: '#FFC400',
    icon: 'carbon:dot-mark',
    text: '3',
    textColor: '#ECC94B',
    outerColor: '#FFC4001A'
  },
  {
    type: 'Ex-Idle',
    color: '#FF8B00',
    icon: 'carbon:dot-mark',
    text: '1',
    textColor: '#FF8B00',
    outerColor: '#FF8B001A'
  },
  {
    type: 'No GPS',
    color: '#00ABBE',
    icon: 'carbon:dot-mark',
    text: '2',
    textColor: '#3182CE',
    outerColor: '#00ABBE1A'
  },
  {
    type: 'No Data',
    color: '#C0C5D0',
    icon: 'carbon:dot-mark',
    text: '0',
    textColor: '#C0C5D0',
    outerColor: '#C0C5D01A'
  },
  {
    type: 'All Status',
    color: '#0F224B',
    icon: 'carbon:dot-mark',
    text: '12',
    textColor: '#0F224B',
    outerColor: '#0F224B1A'
  }
]

function DetailedTrackingHeader({ formik, list }) {
  // ** Styles
  const styles = useCustomStyles()

  // ** Translation Constants
  const { t } = useTranslation()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Getting Table Context and Passing Header Refrence
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  //Export Options
  const handleExportOption = event => {}

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  // ** Selector to Get Asset List
  const assets = useSelector(state => state.assets)

  const assetList = assets?.getAllAssetList?.data?.map(asset => {
    return {
      label: asset.name,
      value: asset.id
    }
  })

  // ** Selector to Get Asset List
  const drivers = useSelector(state => state.driver)

  const driverList = drivers?.getAllDriversList?.data?.map(driver => {
    return {
      label: `${driver.first_name} ${driver?.last_name}`,
      value: driver.id
    }
  })

  // Fetching All Asset List
  useEffect(() => {
    dispatch(getAllAssetAction({ page: 1, limit: 'all' }))
  }, [])

  // Fetching All Drivers List
  useEffect(() => {
    dispatch(getAllDriversAction({ page: 1, limit: 'all' }))
  }, [])

  return (
    <TrackingWrapper ref={headerRef}>
      <Box sx={{ flex: 1, padding: '1.5rem 1.5rem' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={4} rowSpacing={4} alignItems='start'>
            <Grid container xs={12} sm={12} md={9}>
              {stats.map((item, index) => (
                <Grid item xs={2} sm={1.5} md={1} key={index}>
                  <ContentContainer align='center' flexDirection='column'>
                    <TextWrapper mb={2}>
                      <Subtitle size='11px' fontWeight='600' color={item.textColor}>
                        {item.type}
                      </Subtitle>
                    </TextWrapper>
                    <Bullet outer={item.outerColor} dot={item.color} sx={{ marginRight: '0rem !important' }} />
                  </ContentContainer>
                  {/*
          <NumberStats
            textColor={item.textColor}
            color={item.color}
            icon={item.icon}
            text={item.text}
            type={item.type}
          /> */}
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} md={1.75}>
              <Grid item xs={12} md={9}>
                <InputWrapper className='button-wrapper'>
                  <ButtonIcon
                    fullWidth
                    color='success-outlined'
                    startIcon={'material-symbols:arrow-outward-rounded'}
                    onClick={handleClick}
                  >
                    Export
                  </ButtonIcon>
                  <Menu
                    id='basic-menu'
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
                </InputWrapper>
              </Grid>
            </Grid>

            <Grid container xs={12} alignItems='start' columnGap={2} rowSpacing={2} marginTop={3}>
              <Grid item xs={12} sm={6} md={3.1}>
                <Autocomplete
                  fullWidth
                  id='asset_id'
                  name='asset_id'
                  options={assetList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_id', value?.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                    }
                  }}
                  value={assetList?.find(customer => customer.value === parseInt(formik.values.asset_id))}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder={t('tracking.detailedTracking.vehiclePlaceHolder')}
                      error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                      helperText={formik.touched.asset_id && formik.errors.asset_id}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3.2}>
                <Autocomplete
                  fullWidth
                  id='driver_id'
                  name='driver_id'
                  options={driverList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('driver_id', value?.value)
                  }}
                  value={driverList?.find(customer => customer.value === parseInt(formik.values.driver_id))}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder={t('tracking.detailedTracking.driverPlaceHolder')}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextInput
                  fullWidth
                  id='imei'
                  name='imei'
                  placeholder='Search by IMEI'
                  variant='outlined'
                  className={styles.TextField}
                  onChange={e => formik.setFieldValue('imei', e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': { textOverflow: 'ellipsis' }
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconWrapper sx={{ border: 0 }}>
                        <Icon icon='bx:bx-search' width='20' height='20' />
                      </IconWrapper>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </TrackingWrapper>
  )
}

export default DetailedTrackingHeader
