import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Typography } from '@mui/material'

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
import { PlaceholderText, useCustomStyles } from 'src/styles/pages/graphs'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'

function OilHeader({ slug, onChangeHandler, values }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { account, tank, period } = values

  const tankOptions = ['176AE', '176AD', '176AEA', '176RQA']

  const periodOptions = ['daily', 'weekly', 'monthly']

  return (
    <GraphsWrapper bordered>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={8} lg={6} xl={5} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              {/*<Grid item xs={12} sm={6} md={4}>*/}
              {/*<Autocomplete*/}
              {/*    id='account'*/}
              {/*    name='account'*/}
              {/*    options={accountOptions}*/}
              {/*    getOptionLabel={option => option.label}*/}
              {/*    onChange={(e,value) => onChangeHandler("account", value)}*/}
              {/*    value={accountOptions?.find(account => account.name === account)}*/}
              {/*    renderInput={params => (*/}
              {/*      <TextField*/}
              {/*        {...params}*/}
              {/*        variant='outlined'*/}
              {/*        placeholder='Select Account'*/}
              {/*      />*/}
              {/*    )}*/}
              {/*    className={styles.AutoCompleteSelect}*/}
              {/*  />*/}
              {/*</Grid>*/}

              {/*<Grid item xs={12} sm={6} md={4}>*/}
              {/*<Select*/}
              {/*  id='tank'*/}
              {/*  name='tank'*/}
              {/*  variant='outlined'*/}
              {/*  displayEmpty*/}
              {/*  inputProps={{ 'aria-label': 'Without label' }}*/}
              {/*  value={tank}*/}
              {/*  onChange={(e) => onChangeHandler("tank", e.target.value)}*/}
              {/*  className={customStyles.Select}*/}
              {/*  fullWidth*/}
              {/*>*/}
              {/*  {tankOptions.map((name, index) =>*/}
              {/*    index === 0 ? (*/}
              {/*      <MenuItem key={name} value=''>*/}
              {/*        <PlaceholderText>Select Tank</PlaceholderText>*/}
              {/*      </MenuItem>*/}
              {/*    ) : (*/}
              {/*      <MenuItem key={name} value={name}>*/}
              {/*        {name}*/}
              {/*      </MenuItem>*/}
              {/*    )*/}
              {/*  )}*/}
              {/*</Select>*/}
              {/*</Grid>*/}

              <Grid item xs={12} sm={6} md={4}>
                <Select
                  id='period'
                  name='period'
                  variant='outlined'
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={period}
                  onChange={e => onChangeHandler('period', e.target.value)}
                  className={customStyles.Select}
                  fullWidth
                >
                  {periodOptions.map((name, index) =>
                    index === 0 ? (
                      <MenuItem key={name} value=''>
                        <PlaceholderText>Select Period</PlaceholderText>
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
          <Grid item xs={12} md={4} lg={6}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => handleOpen()}>
                  Show
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ marginLeft: 0 }}
                  color='primary-outlined'
                  startIcon={'tabler:arrow-narrow-down'}
                  onClick={() => handleOpen()}
                >
                  Download Chart
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </GraphsWrapper>
  )
}

export default OilHeader

OilHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
