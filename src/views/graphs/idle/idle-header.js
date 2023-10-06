import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import { PlaceholderText, useCustomStyles } from 'src/styles/pages/graphs'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

function IdleHeader({ slug, onChangeHandler, values }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

   // ** Destructure values
   const { account, assetName, all, from_date, to_date, from_time, to_time} = values

  const time = ['12 am', '1 am', '2 am', '3 am']

  return (
    <GraphsWrapper bordered>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={9} xl={8} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              {/*<Grid item xs={12} sm={6} md={2.5}>*/}
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

              {/*<Grid item xs={12} sm={6} md={2.5}>*/}
              {/*<Autocomplete*/}
              {/*    id='assetName'*/}
              {/*    name='assetName'*/}
              {/*    options={assetOptions}*/}
              {/*    getOptionLabel={option => option.label}*/}
              {/*    onChange={(e,value) => onChangeHandler("assetName", value)}*/}
              {/*    value={assetOptions?.find(asset => asset.name === assetName)}*/}
              {/*    renderInput={params => (*/}
              {/*      <TextField*/}
              {/*        {...params}*/}
              {/*        variant='outlined'*/}
              {/*        placeholder='Asset Name'*/}
              {/*      />*/}
              {/*    )}*/}
              {/*    className={styles.AutoCompleteSelect}*/}
              {/*  />*/}
              {/*</Grid>*/}

              <Grid item xs={12} sm={6} md={3.5}>
                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      From Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
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

                <Grid container alignItems='center'>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={7.5}>
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

              <Grid item xs={12} sm={6} md={3.5}>
                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      From Time
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
                  <Select
                      id='from_time'
                      name='from_time'
                      variant='outlined'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={from_time}
                      onChange={(e) => onChangeHandler("from_time", e.target.value)}
                      className={customStyles.Select}
                      fullWidth
                    >
                      {time.map((name, index) =>
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

                <Grid container alignItems='center' mb={3}>
                  <Grid item xs={12} sm={4.5}>
                    <Typography
                      variant='body'
                      className='header-label'
                      sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center' }}
                    >
                      To
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={7.5}>
                  <Select
                      id='to_time'
                      name='to_time'
                      variant='outlined'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={to_time}
                      onChange={(e) => onChangeHandler("to_time", e.target.value)}
                      className={customStyles.Select}
                      fullWidth
                    >
                      {time.map((name, index) =>
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

          <Grid item xs={12} md={4} lg={3} xl={4}>
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

export default IdleHeader

IdleHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
