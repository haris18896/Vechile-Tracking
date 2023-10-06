import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, FormHelperText, ListItem, Typography } from '@mui/material'

// ** Third Party Imports
// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
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
import ReturnAddHeader from './return-add-header'

function ReturnAsset({ slug, customers, formik, data }) {
  const common = useCommonStyles()
  const styles = useCommonStyles()
  const datepickerStyles = useDatepickerStyles()

  // ========= Options =========

  const accountOptions = data?.map((data) => {
    return{
      label: data.customer,
      value: data.id
    }
  })


  const assetOptions = data?.map((data) => {
    return{
      label: data.asset_name,
      value: data.id
    }
  })


  return (
    <>
      <ServicesWrapper className='services-wrapper'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12} sm={5} pr={{ sm: 16 }}>
              <Grid container rowSpacing={5}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid mb={1} xs={12}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Account<Required>*</Required>
                      </Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Autocomplete
                        fullWidth
                        displayEmpty
                        id='account'
                        name='account'
                        variant='outlined'
                        options={accountOptions || []}
                        getOptionLabel={option => option.label}
                        className={styles.AutoCompleteSelect}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                          }
                        }}
                        onChange={(event, newValue) => {
                          formik.setFieldValue('account', newValue?.label)
                        }}
                        value={accountOptions.find(account => account.label === formik.values.account)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant='outlined'
                            placeholder='Select account'
                            error={formik.touched.account && Boolean(formik.errors.account)}
                            helperText={formik.touched.account && formik.errors.account}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Asset Name<Required>*</Required>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        displayEmpty
                        id='asset_name'
                        name='asset_name'
                        variant='outlined'
                        options={assetOptions || []}
                        getOptionLabel={option => option.label}
                        className={styles.AutoCompleteSelect}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                          }
                        }}
                        onChange={(event, newValue) => {
                          formik.setFieldValue('asset_name', newValue?.label)
                        }}
                        value={assetOptions.find(asset => asset?.label === formik?.values?.asset_name)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant='outlined'
                            placeholder='Select asset'
                            error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                            helperText={formik.touched.asset_name && formik.errors.asset_name}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Driver Name<Required>*</Required>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id='driver_name'
                        name='driver_name'
                        type='text'
                        variant='outlined'
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '0.35rem 1.5rem'
                          }
                        }}
                        className={styles.TextField}
                        placeholder='Select Driver Name'
                        {...formik.getFieldProps('driver_name')}
                        error={formik.touched.driver_name && Boolean(formik.errors.driver_name)}
                        helperText={formik.touched.driver_name && formik.errors.driver_name}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        License Number
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='license_num'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter license number'
                        className={styles.TextField}
                        {...formik.getFieldProps('license_num')}
                        error={formik.touched.license_num && Boolean(formik.errors.license_num)}
                        helperText={formik.touched.license_num && formik.errors.license_num}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Total Days Used
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='total_days_used'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Total Days Used'
                        className={styles.TextField}
                        {...formik.getFieldProps('total_days_used')}
                        error={formik.touched.total_days_used && Boolean(formik.errors.total_days_used)}
                        helperText={formik.touched.total_days_used && formik.errors.total_days_used}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Toll Used
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='toll_used'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Toll Used'
                        className={styles.TextField}
                        {...formik.getFieldProps('toll_used')}
                        error={formik.touched.toll_used && Boolean(formik.errors.toll_used)}
                        helperText={formik.touched.toll_used && formik.errors.toll_used}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Toll Charges
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='toll_charges'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Toll Charges'
                        className={styles.TextField}
                        {...formik.getFieldProps('toll_charges')}
                        error={formik.touched.toll_charges && Boolean(formik.errors.toll_charges)}
                        helperText={formik.touched.toll_charges && formik.errors.toll_charges}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Vehicle Damage Charge
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='vehicle_damage_charge'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Vehicle Damage Charges'
                        className={styles.TextField}
                        {...formik.getFieldProps('vehicle_damage_charge')}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Total KM
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='total_km'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Total KM'
                        {...formik.getFieldProps('vehicle_damage_charge')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Traffic Fine
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='traffic_fine'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='"Enter Traffic Fine'
                        {...formik.getFieldProps('traffic_fine')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Total Amount Chargeable
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='total_amount_chargeable'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Total Chargeable Amount'
                        {...formik.getFieldProps('traffic_fine')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} sm={5} pl={{ sm: 16 }}>
              <Grid container rowSpacing={5}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Mobile No
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='mobile_no'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Mobile Number'
                        {...formik.getFieldProps('mobile_no')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                        Employee ID
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='employee_id'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Employee ID'
                        {...formik.getFieldProps('employee_id')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Initial Odometer
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='initial_odometer'
                        id='outlined-basic'
                        variant='outlined'
                        placeholder='Enter Initial Odometer'
                        {...formik.getFieldProps('initial_odometer')}
                        className={styles.TextField}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                        Initial Vehicle Condition
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        name='initial_vehicle_condition'
                        id='outlined-basic'
                        variant='outlined'
                        className={styles.TextArea}
                        placeholder='Enter Initial Vehicle Condition'
                        {...formik.getFieldProps('initial_vehicle_condition')}
                        multiline
                        fullWidth
                        rows={3}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                        Vehicle Present Condition
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='vehicle_present_condition'
                        id='outlined-basic'
                        variant='outlined'
                        className={styles.TextArea}
                        placeholder='Enter Vehicle Present Condition'
                        {...formik.getFieldProps('vehicle_present_condition')}
                        multiline
                        fullWidth
                        rows={3}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                        Return Date<Required>*</Required>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <DatePickerWrapper sx={{ width: '100%',
                      '& input': { borderColor: formik.touched.return_date && formik.errors.return_date && '#E53E3E !important' }
                       }}
                      >
                        <DatePicker
                          selected={formik?.values?.return_date && formik?.values?.return_date}
                          placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                          onChange={date => formik.setFieldValue('return_date', date)}
                          className={datepickerStyles.datepicker}
                          dateFormat='yyyy-MM-dd'
                        />
                      {formik.touched.return_date &&
                      Boolean(formik.errors.return_date) && (
                        <FormHelperText error>{formik.errors.return_date}</FormHelperText>
                      )}
                      </DatePickerWrapper>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12} mb={2}>
                      <Typography variant='body' sx={{ mt: 1, fontWeight: '500', textAlign: 'center' }}>
                        Return Odometer<Required>*</Required>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        name='return_odometer'
                        id='outlined-basic'
                        variant='outlined'
                        {...formik.getFieldProps('return_odometer')}
                        placeholder='Enter Return Odometer'
                        className={styles.TextField}
                        error={formik.touched.return_odometer && Boolean(formik.errors.return_odometer)}
                        helperText={formik.touched.return_odometer && formik.errors.return_odometer}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ServicesWrapper>
    </>
  )
}

export default ReturnAsset

ReturnAsset.propTypes = {
  slug: PropTypes.string,
  ononChangeHandler: PropTypes.func
}
