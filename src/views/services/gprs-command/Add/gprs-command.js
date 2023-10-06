import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import { Autocomplete, Box, Checkbox, FormControlLabel, FormHelperText, ListItem, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import {  Required} from 'src/styles/pages/services/edit'
import {  useDatepickerStyles } from 'src/styles/components/datepicker'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

import { TextField } from '@mui/material'
import { ServicesWrapper } from 'src/styles/pages/services'

function GprsCommand({ slug, onChangeHandler, customers, formik }) {
  const styles = useCommonStyles()

   // ========= Options =========

  const accountOptions = customers?.map(customer => {
    return {
      label: customer.company_name,
      value: customer.id,
    }
  })

  const commandOptions = []

  const assetOptions = []

  return (

    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems="flex-start" >
      <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                Account<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(event, value) => {
                formik.setFieldValue('account', value?.value)
              }}
              value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.value === parseInt(formik.values.account) ) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                  error={formik.touched.account && Boolean(formik.errors.account)}
                  helperText={formik.touched.account && formik.errors.account}
                />
              )}
              className={styles.AutoCompleteSelect}
            />
        </Grid>


        <Grid item xs={12} sm={6} md={5}>
        <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
          Command Type
        </Typography>
        <Autocomplete
        fullWidth
        id='command_type'
        name='command_type'
        options={commandOptions || []}
        value={formik.values.command_type ? (commandOptions ? commandOptions.find(data => data.value === formik.values.command_type) : '') : ''}
        sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: formik.touched.command_type && formik.errors.command_type && '#E53E3E !important'
        },
        marginTop: 1 }}
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            placeholder='Select Command Type'
            error={formik.touched.command_type && Boolean(formik.errors.command_type)}
            helperText={formik.touched.command_type && formik.errors.command_type}
          />
        )}
        onChange={(event, newValue) => {
          formik.setFieldValue('command_type', newValue?.value)
        }}
        className={styles.AutoCompleteSelect}
      />
    </Grid>   


            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Asset Name<Required>*</Required>
              </Typography>
              <Box display="flex" alignItems="start">
              <Autocomplete
              fullWidth
              id='asset_name'
              name='asset_name'
              options={assetOptions || []}
              value={formik.values.asset_name ? (assetOptions ? assetOptions.find(data => data.value === formik.values.asset_name) : '') : ''}
              sx={{ "& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                },
                flex: 1,
                marginTop: 1
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Asset'
                  error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                  helperText={formik.touched.asset_name && formik.errors.asset_name}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('asset_name', newValue?.value)
              }}
              className={styles.AutoCompleteSelect}
            />

                <FormControlLabel  
                  control={
                    <Checkbox
                      id='all_assets'
                      name='all_assets'
                      type='checkbox'
                      sx={{ padding: 0, marginRight: 2,  }}
                      checked={formik.values.all_assets}
                      onClick={() => {
                        formik.setFieldValue('all_assets', !formik.values.all_assets)
                      }}
                      className={styles.Checkbox}
                    />
                  }
                  sx={{ "&.MuiFormControlLabel-root":{ marginLeft: 3, marginRight: 0, marginTop: 2 } }}
                  label={<Typography sx={{ fontWeight: '500', textAlign: 'center' }}>All</Typography>}
                />

             </Box>
            </Grid>  


            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Parameter
              </Typography>
              <TextField
                name='parameter'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                error={formik.touched.parameter && Boolean(formik.errors.parameter)}
                helperText={formik.touched.parameter && formik.errors.parameter}
                placeholder='Enter Parameter'
                {...formik.getFieldProps('parameter')}
                sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>   


          <Grid item xs={12} sm={6} md={5}  visibility={{ md: 'hidden'}}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Extra Works Done
              </Typography>
              <TextField
                name='mobile_no'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                placeholder='Enter Extra Works Done'
              {...formik.getFieldProps('work_done')}
              error={formik.touched.work_done && Boolean(formik.errors.work_done)}
              helperText={formik.touched.work_done && formik.errors.work_done}
              sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>          

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Command<Required>*</Required>
              </Typography>
              <TextField
                name='command'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                placeholder='Enter Command'
                error={formik.touched.command && Boolean(formik.errors.command)}
                helperText={formik.touched.command && formik.errors.command}
                {...formik.getFieldProps('command')}
                sx={{ marginTop: 1 }}
              ></TextField>
          </Grid> 

              

          <Grid item xs={12} sm={6} md={5} visibility={{ md: 'hidden'}}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Total Amount
              </Typography>
              <TextField
                name='total_amount'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
                helperText={formik.touched.total_amount && formik.errors.total_amount}
              {...formik.getFieldProps('total_amount')}
              sx={{ marginTop: 1 }}
              ></TextField>
           </Grid>      
    
          </Grid>         
    </ServicesWrapper>
  )
}

export default GprsCommand

GprsCommand.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
