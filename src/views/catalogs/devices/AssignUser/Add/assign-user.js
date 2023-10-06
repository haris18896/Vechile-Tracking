import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormHelperText, ListItem, Typography } from '@mui/material'

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
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
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
import select from 'src/@core/theme/overrides/select'

import CustomChip from 'src/@core/components/mui/chip'


function AssignUser({ customers, formik }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const dateStyles = useDatepickerStyles()

  // STATE
  const [search, setSearch]= useState('');

// ========= Options =========

const accountOptions = customers?.map((customer => {
  return {
    label: customer.company_name,
    id: customer.id
  }
}))

const userOptions = []

const handleAssignedDeviceList = (device) => {
  const newArr = JSON.parse(JSON.stringify(formik?.values?.deviceList));
  newArr[device.id - 1].checked = !newArr[device.id - 1].checked;
  formik.setFieldValue('deviceList', newArr);  
  formik.setFieldValue('assignedDevicesList', newArr.filter(data => data.checked === true)?.map(data => data.title));  
};

const filteredData = formik.values?.deviceList?.filter((data) => {
  if (search) {
    return data.title?.toLowerCase().includes(search.toLowerCase());
  } else {
    return data;
  }
});

const assignedDevices = formik.values?.deviceList?.filter((data) =>{
  return data.checked
})

console.log('check this ==>', formik.values?.assignedDevicesList)

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems="flex-start" >
            <Grid item xs={12} sm={6} md={5}>
            <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
              Search Device<Required>*</Required>
            </Typography>
            <TextField
                name='search_device'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
                sx={{ marginTop: 1 }}
                placeholder='Enter Device Name'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              ></TextField>  


            <Grid item mt={4}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}} mb={2}>
                Device List
              </Typography>
                  {filteredData?.map(device => (
                    <Grid item xs={12}  key={device?.id} display="flex" justifyContent="space-between">
                    <FormControlLabel
                      sx={{ width: '100%' }}
                      control={
                        <Checkbox
                          defaultValue={false}
                          sx={{
                            '&.Mui-checked': {
                              color: '#FF8B00'
                            }
                          }}
                          checked = {formik.values?.deviceList[device.id - 1]?.checked}
                          onChange={() => handleAssignedDeviceList(device)}
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                          {device.title}
                        </Typography>
                      }
                    />
                    </Grid>
                  ))}
              </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                Account<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.label === formik.values.account) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Enter Account Name'
                  error={formik.touched.account && Boolean(formik.errors.account)}
                  helperText={formik.touched.account && formik.errors.account}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('account', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />  

            <Grid item mt={4}>
              <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
               Users <Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='user'
              name='user'
              options={userOptions || []}
              value={formik.values.user ? (userOptions ? userOptions.find(data => data.label === formik.values.user) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.user && formik.errors.user && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select User'
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('user', newValue?.label)
              }}
              className={styles.AutoCompleteSelect}
            />  
          </Grid>

            <Grid item mt={4}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}} mb={2}>
                Assign Date<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.assign_date && formik.errors.assign_date && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.assign_date || ""}
                      id='assign-date'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('assign_date', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText= {moment().format('YYYY-MM-DD')}
                    />
                    {/* show error  */}
                    {formik.touched.assign_date &&
                      Boolean(formik.errors.assign_date) && (
                        <FormHelperText error>{formik.errors.assign_date}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid>

            <Grid item mt={4}>
            <Typography variant='body' sx={{ fontWeight: '500', display: 'block'}} mb={2}>
                Selected Devices
            </Typography>
                  {assignedDevices?.map(device => (
                    <Grid item xs={12}  key={device?.id} display="flex" justifyContent="space-between" mb={2}>
                        <Typography sx={{ fontWeight: '400', textAlign: 'center', fontSize: '1rem' }}>
                          {device.title}
                        </Typography>
                    </Grid>
                  ))}
              </Grid>


          </Grid>


 
          </Grid>         
    </ServicesWrapper>

  )
}

export default AssignUser

AssignUser.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
