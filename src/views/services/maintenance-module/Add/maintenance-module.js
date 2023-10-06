import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, FormHelperText, ListItem, Typography } from '@mui/material'

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
import Modal from './modal'

function MaintenanceModule({ slug, onChangeHandler, customers, formik }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const dateStyles = useDatepickerStyles()
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  // ========= Options =========

  const assetOptions = customers?.map(customer => {
    return {
      label: customer.asset_name,
      value: customer.id,
    }
  })

  const employmentOptions = [
    { label: 'Freelancer', value: 'freelancer' },
    { label: 'Full Time', value: 'full-time' },
    { label: 'Part Time', value: 'part-time' },
  ];

  const nationalityOptions = [
    { label: 'Canadian', value: 'canadian' },
    { label: 'Arab', value: 'arab' },
    { label: 'American', value: 'american' },
  ]

  const licenseOptions = [
    { label: 'Gold', value: 'gold' },
    { label: 'Visit', value: 'visit' },
    { label: 'Working', value: 'working' },
  ]

  const accountOptions = customers?.map(customer => {
    return {
      label: customer.customer,
      value: customer.id,
    }
  })

  console.log('customer ==>', assetOptions)

  const allocateOptions = []

  const driverOptions = customers?.map(customer => {
    return {
      label: customer.driver,
      value: customer.id,
    }
  })

  const serviceOptions = customers?.map(customer => {
    return {
      label: customer.service,
      value: customer.id,
    }
  })


  // ========= States =========


  // ** Form Validation
  const driverSchema = Yup.object().shape({
    account: Yup.string()
    .required('Account is required')
    .max(100, 'The name must not be greater than 100 characters.'),

    name: Yup.string()
    .required('Name is required'),

    last_name: Yup.string()
    .required('Last name is required')
  })
  
      // ** Form Values
  const addDriverformik = useFormik({
    initialValues: {
      account: '',
      name: '',
      last_name :'',
      employeeId: '',
      emp_status: '',
      nationality: "",
      sponsor: '',
      last_name: '',
      address: "",
      license_type: ''
    },
    validationSchema: driverSchema,
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

  const handleSubmit = () => {
    console.log('form submitted.')
    setOpen(false)
  }

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems="flex-end" >
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
                formik.setFieldValue('account', value?.label)
              }}
              value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.label === formik.values.account ) : '') : ''}
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
                Service Date<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.service_date && formik.errors.service_date && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.service_date || new Date()}
           
                      id='service-type'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('service_date', date)}
                      dateFormat='yyyy-MM-dd'
                    />
                    {/* show error  */}
                    {formik.touched.service_date &&
                      Boolean(formik.errors.service_date) && (
                        <FormHelperText error>{formik.errors.service_date}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid>

              <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Asset Name<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='asset_name'
              name='asset_name'
              options={assetOptions || []}
              value={formik.values.asset_name ? (assetOptions ? assetOptions.find(data => data.label === formik.values.asset_name) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
              },
              marginTop: 1  }}
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
                formik.setFieldValue('asset_name', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Garage Name
              </Typography>
              <TextField
                name='garage_name'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.garage_name && Boolean(formik.errors.garage_name)}
                helperText={formik.touched.garage_name && formik.errors.garage_name}
                placeholder='Enter Garage Name'
              {...formik.getFieldProps('garage_name')}
              ></TextField>          
              </Grid>

              <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Driver Name<Required>*</Required>
              </Typography>
              <Box display="flex" alignItems="flex-start">
              <Autocomplete
              fullWidth
              id='driver'
              name='driver'
              options={driverOptions || []}
              value={formik.values.driver ? (driverOptions ? driverOptions.find(data => data.label === formik.values.driver) : '') : ''}
              sx={{ "& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                "&.MuiAutocomplete-root":{
                  flex: 1,
                  marginRight: 5
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.driver && formik.errors.driver && '#E53E3E !important'
                },
                marginTop: 1
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Please Select or Add New'
                  error={formik.touched.driver && Boolean(formik.errors.driver)}
                  helperText={formik.touched.driver && formik.errors.driver}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('driver', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />
             <Button onClick={() => setOpen(true)} marginLeft="auto" sx={{ minWidth: '35px', minHeight: '35px', marginLeft: 'auto', padding: '5px', borderRadius: '50%', background: '#2FC17E !important', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <Icon icon="ic:round-plus" fontSize={28} color="#fff" />
             </Button>
             </Box>
            </Grid>
          
          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Garage Address
              </Typography>
              <TextField
                name='garage_address'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
                error={formik.touched.garage_address && Boolean(formik.errors.garage_address)}
                helperText={formik.touched.garage_address && formik.errors.garage_address}
                placeholder='Enter Garage Address'
              {...formik.getFieldProps('garage_address')}
              sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>       

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Current Odometer
              </Typography>
              <TextField
                name='current_odometer'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
                error={formik.touched.current_odometer && Boolean(formik.errors.current_odometer)}
                helperText={formik.touched.current_odometer && formik.errors.current_odometer}
                placeholder='Enter Current Odometer'
                {...formik.getFieldProps('current_odometer')}
                sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>      

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Extra Works Done
              </Typography>
              <TextField
                name='mobile_no'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
              {...formik.getFieldProps('work_done')}
              error={formik.touched.work_done && Boolean(formik.errors.work_done)}
              helperText={formik.touched.work_done && formik.errors.work_done}
              placeholder='Enter Extra Work Done'
              sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>          

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Service Type<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='service_type'
              name='service_type'
              options={serviceOptions || []}
              value={formik.values.service_type ? (serviceOptions ? serviceOptions.find(data => data.label === formik.values.service_type) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.service_type && formik.errors.service_type && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Please Select'
                  error={formik.touched.service_type && Boolean(formik.errors.service_type)}
                  helperText={formik.touched.service_type && formik.errors.service_type}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('service_type', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />
          </Grid>                 

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Total Amount
              </Typography>
              <TextField
                name='total_amount'
                id='outlined-basic'
                variant='outlined'
                className={customStyles.TextField}
                error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
                helperText={formik.touched.total_amount && formik.errors.total_amount}
                placeholder='Enter Total Amount'
              {...formik.getFieldProps('total_amount')}
              sx={{ marginTop: 1 }}
              ></TextField>
           </Grid>          
          </Grid>         

     <Modal
        open={open}
        handleClose={() => handleClose()}
        handleSubmit={handleSubmit}
        title={<Box sx={{display:'flex',  justifyContent:'space-between'}}>
        <Typography sx={{ fontSize: '1.2rem', color: '#556485', fontWeight: '600' }}>Add Driver</Typography>
        <Button sx={{ padding: 0, justifyContent: 'end', 
        "&.MuiButtonBase-root:hover":{ background: 'none'},
        }} onClick={handleClose}>
        <Icon icon="akar-icons:cross" color='#000' fontSize={20} fontWeight="600" />
        </Button></Box>}
        vehicles={assetOptions}
        accountOptions ={accountOptions}
        employmentOptions= {employmentOptions}
        nationalityOptions= {nationalityOptions}
        licenseOptions={licenseOptions}
        formik = {addDriverformik}
      />

    </ServicesWrapper>

    
  )
}

export default MaintenanceModule

MaintenanceModule.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
