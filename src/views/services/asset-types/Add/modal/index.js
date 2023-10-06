import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'
import { HeaderLabel, TextInput, TextLabel } from 'src/styles/components/input'

import { useCustomStyles } from 'src/styles/pages/services/edit'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import moment from 'moment'
import Image from 'next/image'


//Modal for Route Management
const Modal = ({ open, handleClose, title, handleSubmit, vehicles, assetOptions, dobOptions, accountOptions, sponsorOptions, employmentOptions, formik, nationalityOptions,licenseOptions }) => {
  const [asset, setAsset] = useState('')
  const styles = useCommonStyles({ modalBg: '#fff' })
  const dateStyles = useDatepickerStyles()
  const [selectedImage, setSelectedImage] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [passwords, setPasswords] = useState({
    showPassword: false,
    showConfirmPassword: false,
  })

  const { showPassword, showConfirmPassword} = passwords;

  const vehicleOptions = [
    {
      name: 'Heavy Vehicle'
    },
    {
      name: 'Light Vehicle'
    }
  ] 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      formik.setFieldValue("photo_id", )
      const imageUrl = URL.createObjectURL(file);
      setThumbnail(imageUrl);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-permission'
      className={styles.Modal}
      PaperProps={{ sx: { 
      maxWidth: '1000px', background: '#fff', maxHeight: '80%',
      padding: { xs: '1rem', sm: '1rem 2rem'},
      "::-webkit-scrollbar":{background: 'transparent'},
      "::-webkit-scrollbar-track":{background: 'transparent'},
      } }}
      
    >
      <DialogTitle id='add-permission' sx={{ fontWeight: '700', color: '#556485', position: 'sticky', top: '-20px', background: '#fff', zIndex: '99' }}>
      <Box sx={{display:'flex',  justifyContent:'space-between'}}>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: '700', color: '#556485'}}>{title}
        </Typography>
        <Button sx={{ padding: 0, justifyContent: 'end'}} onClick={handleClose}>
        <Icon icon="akar-icons:cross" color='#000' fontSize={20} fontWeight="600" />
        </Button>
        </Box>
      </DialogTitle>
      <form name='add-permissions' onSubmit={formik.handleSubmit}>
        <DialogContent sx={{paddingY: 0, marginBottom: 8}}>

        <Grid container columnSpacing={20} mb={8}>

          {/* ========= DRIVER DETAILS ========= */}
            
          <Grid item xs={12} md={6} pt={0}>
          <HeaderLabel sx={{ fontSize: '1rem'}}>Driver Details</HeaderLabel>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} mt={5}>
          <Grid item xs={12} >
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Account <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <Autocomplete
                id='account'
                name='account'
                options={accountOptions || []}
                className={styles.AutoCompleteSelect}
                getOptionLabel={option => option.label}
                onChange={(event, newValue) => {
                  formik.setFieldValue('account', newValue.label)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                  }
                }}
                value={accountOptions?.find(account => account.label === formik.values.account)}
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

            {/* Vehicles Checkboxes */}
            <Grid item xs={12}>
            <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Asset Type
              </TextLabel>
              <Grid container sx={{ padding: '0.2rem 1rem' }}>
                <Grid item xs={12} display="flex">
                  {vehicleOptions.map(vehicle => (
                    <FormControlLabel
                      key={vehicle.name}
                      sx={{ width: '100%' }}
                      control={
                        <Checkbox
                          defaultValue={false}
                          sx={{
                            '&.Mui-checked': {
                              color: '#FF8B00'
                            }
                          }}
                          checked={vehicle.name.toLowerCase() === formik.values.asset_type.toLowerCase() ? true : false}
                          onChange={() => formik.setFieldValue("asset_type", vehicle.name.toLowerCase() === "light vehicle" ? "light vehicle" : "heavy vehicle" )}
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                          {vehicle.name}
                        </Typography>
                      }
                    />
                  ))}

                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Name <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='name'
                name='name'
                variant='outlined'
                placeholder='Enter First Name'
                {...formik.getFieldProps('name')}
                className={styles.TextField}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
          </Grid>

        <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Last Name <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='last_name'
                name='last_name'
                variant='outlined'
                placeholder='Enter Last Name'
                {...formik.getFieldProps('last_name')}
                className={styles.TextField}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
        </Grid>


        <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Address
              </TextLabel>
              <TextInput
                fullWidth
                id='address'
                name='address'
                variant='outlined'
                placeholder='Enter Address'
                {...formik.getFieldProps('address')}
                className={styles.TextArea}
                multiline
                rows={4}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
        </Grid>


          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Username <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='username'
                name='username'
                variant='outlined'
                placeholder='Enter Last Name'
                {...formik.getFieldProps('username')}
                className={styles.TextField}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
          </Grid>


          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Password <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='password'
                name='password'
                variant='outlined'
                placeholder='Enter Password'
                {...formik.getFieldProps('password')}
                type={ showPassword ? 'text' : 'password'}
                className={styles.TextField}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setPasswords({...passwords, showPassword: !showPassword})}
                    >
                      <Icon
                        // className={classes.icon}
                        icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                        fontSize={20}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Re-enter Password <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='confirm_password'
                name='confirm_password'
                variant='outlined'
                placeholder='Enter Password'
                {...formik.getFieldProps('confirm_password')}
                type={ showConfirmPassword ? 'text' : 'password'}
                className={styles.TextField}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setPasswords({...passwords, showConfirmPassword: !showConfirmPassword})}
                    >
                      <Icon
                        // className={classes.icon}
                        icon={showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                        fontSize={20}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
          </Grid>


          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Mobile No. <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='mobile_no'
                name='mobile_no'
                variant='outlined'
                placeholder='Enter Mobile No.'
                {...formik.getFieldProps('mobile_no')}
                className={styles.TextField}
                error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
                helperText={formik.touched.mobile_no && formik.errors.mobile_no}
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Email ID <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='email_id'
                name='email_id'
                variant='outlined'
                placeholder='Enter Email ID'
                {...formik.getFieldProps('email_id')}
                className={styles.TextField}
                error={formik.touched.email_id && Boolean(formik.errors.email_id)}
                helperText={formik.touched.email_id && formik.errors.email_id}
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                DOB Format
              </TextLabel>
              <Autocomplete
                id='dob_format'
                name='dob_format'
                options={dobOptions || []}
                className={styles.AutoCompleteSelect}
                getOptionLabel={option => option.label}
                onChange={(event, newValue) => {
                  formik.setFieldValue('dob_format', newValue.label)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.dob_format && formik.errors.dob_format && '#E53E3E !important'
                  }
                }}
                value={dobOptions?.find(dob => dob.label === formik.values.dob_format)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select DOB Format'
                    error={formik.touched.dob_format && Boolean(formik.errors.dob_format)}
                    helperText={formik.touched.dob_format && formik.errors.dob_format}
                  />
                )}
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
              Date of Birth
              </TextLabel>
              <DatePickerWrapper
            sx={{
            '& input': { borderColor: formik.touched.dob && formik.errors.dob && '#E53E3E !important' }
            }}
            >
            <DatePicker
              selected={formik.values.dob}
              id='dob'
              className={dateStyles.datepicker}
              onChange={date => formik.setFieldValue('dob', date)}
              dateFormat='yyyy-MM-dd'
              placeholderText= {moment(new Date()).format('yyyy-MM-DD')}
            />
              {/* show error  */}
              {formik.touched.dob &&
                Boolean(formik.errors.dob) && (
                  <FormHelperText error>{formik.errors.dob}</FormHelperText>
                )}
              </DatePickerWrapper>
        </Grid>

        <Grid item xs={12}>
        <TextLabel sx={{ marginBottom: '0.5rem' }}>
              Photo ID (75 * 75)
        </TextLabel>

          <Grid container spacing={5} justifyContent="space-between">
        <Grid item xs={4}>
        <Button
          variant="contained"
          component="label"
          sx={{ background: '#FF8B00', borderRadius:'50px', flex: 0.5, boxShadow: 'none', width: '100%',
              "&.MuiButtonBase-root:hover":{
                backgroundColor: '#e57d00'
              }
        }}
        >
          Browse
          <TextField
            type="file"
            name="photo_id"
            {...formik.getFieldProps('photo_id')}

            onChange={handleImageChange}
            sx={{ display: 'none'}}
          />
        </Button>

        {formik.touched.photo_id && Boolean(formik.errors.photo_id) && (
              <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                {formik.touched.photo_id && formik.errors.photo_id}
              </FormHelperText>
        )}
        </Grid>

        

        <Grid item xs={6}>
          <Box sx={{background: thumbnail ?  'none' : '#0000001A', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200}}>
          {thumbnail ? <Image src={ thumbnail } width={200} height={200} alt="Thumbnail" style={{ objectFit: 'cover'}} />
          : <Typography>No Image</Typography>}
          </Box>
        </Grid>

        <Grid item display="flex" justifyContent="end" sx={{ "& svg:hover": { color : '#EB0E38 !important'}, "& svg": { transition: '.3s ease'} }}>
        <Icon icon="ion:trash-sharp" onClick={() => setThumbnail('')} fontSize={22} color="#C8CCD6" cursor="pointer" />
        </Grid>

        </Grid>
        </Grid>

        <Grid item>
        <HeaderLabel sx={{ fontSize: '1rem'}}>Tracking Details</HeaderLabel>
        </Grid>

        <Grid item xs={12} mt={5}>
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
                    checked={formik.values.track ? true : false}
                    onChange={() => formik.setFieldValue('track', !formik.values.track)}
                  />
                }
                label={
                  <Typography sx={{ fontWeight: '600', textAlign: 'center', fontSize: '0.875rem' }}>
                    Track
                  </Typography>
                }
              />
        </Grid>

        <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Asset Name
              </TextLabel>
              <Autocomplete
                id='asset_name'
                name='asset_name'
                options={assetOptions || []}
                className={styles.AutoCompleteSelect}
                getOptionLabel={option => option.label}
                onChange={(event, newValue) => {
                  formik.setFieldValue('asset_name', newValue.label)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                  }
                }}
                value={assetOptions?.find(asset => asset.label === formik.values.asset_name)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select DOB Format'
                    error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                    helperText={formik.touched.asset_name && formik.errors.asset_name}
                  />
                )}
              />
          </Grid>

          <Grid item xs={12} md={4}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Tag ID #1
              </TextLabel>
              <TextInput
                fullWidth
                id='tag_id1'
                name='tag_id1'
                variant='outlined'
                // placeholder='Enter Tag ID 1'
                {...formik.getFieldProps('tag_id1')}
                className={styles.TextField}
                error={formik.touched.tag_id1 && Boolean(formik.errors.tag_id1)}
                helperText={formik.touched.tag_id1 && formik.errors.tag_id1}
              />
          </Grid>

          <Grid item xs={12} md={4}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Tag ID #2
              </TextLabel>
              <TextInput
                fullWidth
                id='tag_id2'
                name='tag_id2'
                variant='outlined'
                // placeholder='Enter Tag ID 1'
                {...formik.getFieldProps('tag_id2')}
                className={styles.TextField}
                error={formik.touched.tag_id2 && Boolean(formik.errors.tag_id2)}
                helperText={formik.touched.tag_id2 && formik.errors.tag_id2}
              />
          </Grid>

          <Grid item xs={12} md={4}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Tag ID #3
              </TextLabel>
              <TextInput
                fullWidth
                id='tag_id3'
                name='tag_id3'
                variant='outlined'
                // placeholder='Enter Tag ID 1'
                {...formik.getFieldProps('tag_id3')}
                className={styles.TextField}
                error={formik.touched.tag_id3 && Boolean(formik.errors.tag_id3)}
                helperText={formik.touched.tag_id3 && formik.errors.tag_id3}
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Daily Working Hours
              </TextLabel>
              <TextInput
                fullWidth
                id='work_hours'
                name='work_hours'
                variant='outlined'
                placeholder='Enter Daily Working Hours'
                {...formik.getFieldProps('work_hours')}
                className={styles.TextField}
                error={formik.touched.work_hours && Boolean(formik.errors.work_hours)}
                helperText={formik.touched.work_hours && formik.errors.work_hours}
              />
          </Grid>

          <Grid item xs={12}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Overtime Charges
              </TextLabel>
              <TextInput
                fullWidth
                id='overtime_charges'
                name='overtime_charges'
                variant='outlined'
                placeholder='Enter Overtime Charges'
                {...formik.getFieldProps('overtime_charges')}
                className={styles.TextField}
                error={formik.touched.overtime_charges && Boolean(formik.errors.overtime_charges)}
                helperText={formik.touched.overtime_charges && formik.errors.overtime_charges}
              />
          </Grid>


        </Grid>         
        </Box>
          </Grid>
          

          {/* ========= EMPLOYEE INFO ========= */}
          <Grid item xs={12} md={6} pt={0}>
          <HeaderLabel sx={{ fontSize: '1rem'}}>Employee Information</HeaderLabel>
            
            <Grid container spacing={4} mt={5}>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Employee ID
                </TextLabel>
                <TextInput
                  fullWidth
                  id='employeeId'
                  name='employeeId'
                  variant='outlined'
                  placeholder='Enter Employee ID'
                  {...formik.getFieldProps('employeeId')}
                  className={styles.TextField}
                  error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                  helperText={formik.touched.employeeId && formik.errors.employeeId}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Employment Status
                </TextLabel>
                <Autocomplete
                  id='emp_status'
                  name='emp_status'
                  options={employmentOptions}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('emp_status', newValue.label)
                  }}
                  value={employmentOptions?.find(emp => emp.label === formik.values.emp_status)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Employment Status'
                      error={formik.touched.emp_status && Boolean(formik.errors.emp_status)}
                      helperText={formik.touched.emp_status && formik.errors.emp_status}
                    />
                  )}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Nationality
                </TextLabel>
                <Autocomplete
                  id='nationality'
                  name='nationality'
                  options={nationalityOptions}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('nationality', newValue.label)
                  }}
                  value={nationalityOptions?.find(nat => nat.label === formik.values.nationality)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Nationality'
                      error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                      helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                  )}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Sponsor
                </TextLabel>
                <Autocomplete
                  id='sponsor'
                  name='sponsor'
                  options={sponsorOptions}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('sponsor', newValue.label)
                  }}
                  value={sponsorOptions?.find(emp => emp.label === formik.values.sponsor)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'

                      placeholder='Select Sponsor'
                      error={formik.touched.sponsor && Boolean(formik.errors.sponsor)}
                      helperText={formik.touched.sponsor && formik.errors.sponsor}
                    />
                  )}
                />
          </Grid>

          <Grid item xs={12} mt={8}>
          <HeaderLabel sx={{ fontSize: '1rem'}}>Driver Details</HeaderLabel>
          </Grid>

          <Grid item xs={12} mt={5}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  License Type
                </TextLabel>
                <Autocomplete
                  id='license_type'
                  name='license_type'
                  options={licenseOptions}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('license_type', newValue.label)
                  }}
                  value={licenseOptions?.find(license => license.label === formik.values.license_type)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'

                      placeholder='Select License Type'
                      error={formik.touched.license_type && Boolean(formik.errors.license_type)}
                      helperText={formik.touched.license_type && formik.errors.license_type}
                    />
                  )}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  License Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='license_no'
                  name='license_no'
                  variant='outlined'
                  placeholder='Enter License Number'
                  {...formik.getFieldProps('license_no')}
                  className={styles.TextField}
                  error={formik.touched.license_no && Boolean(formik.errors.license_no)}
                  helperText={formik.touched.license_no && formik.errors.license_no}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                License Expiry Date
                </TextLabel>
                <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.license_expiry && formik.errors.license_expiry && '#E53E3E !important' }
              }}
              >
              <DatePicker
                selected={formik.values.license_expiry}
      
                id='license_expiry'
                className={dateStyles.datepicker}
                onChange={date => formik.setFieldValue('license_expiry', date)}
                dateFormat='yyyy-MM-dd'
                placeholderText= {moment(new Date()).format('yyyy-MM-DD')}
              />
                {/* show error  */}
                {formik.touched.license_expiry &&
                  Boolean(formik.errors.license_expiry) && (
                    <FormHelperText error>{formik.errors.license_expiry}</FormHelperText>
                  )}
                </DatePickerWrapper>
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Other Permit
                </TextLabel>
                <TextInput
                  fullWidth
                  id='other_permit'
                  name='other_permit'
                  variant='outlined'
                  placeholder='Enter Permit'
                  {...formik.getFieldProps('other_permit')}
                  className={styles.TextField}
                  error={formik.touched.other_permit && Boolean(formik.errors.other_permit)}
                  helperText={formik.touched.other_permit && formik.errors.other_permit}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Permit No.
                </TextLabel>
                <TextInput
                  fullWidth
                  id='permit_no'
                  name='permit_no'
                  variant='outlined'
                  placeholder='Enter Permit No.'
                  {...formik.getFieldProps('permit_no')}
                  className={styles.TextField}
                  error={formik.touched.permit_no && Boolean(formik.errors.permit_no)}
                  helperText={formik.touched.permit_no && formik.errors.permit_no}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Permit Expiry Date
                </TextLabel>
                <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.permit_expiry && formik.errors.permit_expiry && '#E53E3E !important' }
              }}
              >
              <DatePicker
                selected={formik.values.permit_expiry}
      
                id='permit_expiry'
                className={dateStyles.datepicker}
                onChange={date => formik.setFieldValue('permit_expiry', date)}
                dateFormat='yyyy-MM-dd'
                placeholderText= {moment(new Date()).format('yyyy-MM-DD')}
              />
                {/* show error  */}
                {formik.touched.permit_expiry &&
                  Boolean(formik.errors.permit_expiry) && (
                    <FormHelperText error>{formik.errors.permit_expiry}</FormHelperText>
                  )}
                </DatePickerWrapper>
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Visa Expiry Date
                </TextLabel>
                <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.visa_expiry && formik.errors.visa_expiry && '#E53E3E !important' }
              }}
              >
              <DatePicker
                selected={formik.values.visa_expiry}
      
                id='visa_expiry'
                className={dateStyles.datepicker}
                onChange={date => formik.setFieldValue('visa_expiry', date)}
                dateFormat='yyyy-MM-dd'
                placeholderText= {moment(new Date()).format('yyyy-MM-DD')}
              />
                {/* show error  */}
                {formik.touched.visa_expiry &&
                  Boolean(formik.errors.visa_expiry) && (
                    <FormHelperText error>{formik.errors.visa_expiry}</FormHelperText>
                  )}
                </DatePickerWrapper>
            </Grid>

            <Grid item xs={12} mt={8}>
            <HeaderLabel sx={{ fontSize: '1rem'}}>Emergency Information</HeaderLabel>
            </Grid>

            <Grid item xs={12} mt={5}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Emergency Contact Name
                </TextLabel>
                <TextInput
                  fullWidth
                  id='emergency_contact_name'
                  name='emergency_contact_name'
                  variant='outlined'
                  placeholder='Enter Emergency Contact Name'
                  {...formik.getFieldProps('emergency_contact_name')}
                  className={styles.TextField}
                  error={formik.touched.emergency_contact_name && Boolean(formik.errors.emergency_contact_name)}
                  helperText={formik.touched.emergency_contact_name && formik.errors.emergency_contact_name}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Emergency Contact No.
                </TextLabel>
                <TextInput
                  fullWidth
                  id='emergency_contact_no'
                  name='emergency_contact_no'
                  variant='outlined'
                  placeholder='Enter Emergency Contact No.'
                  {...formik.getFieldProps('emergency_contact_no')}
                  className={styles.TextField}
                  error={formik.touched.emergency_contact_no && Boolean(formik.errors.emergency_contact_no)}
                  helperText={formik.touched.emergency_contact_no && formik.errors.emergency_contact_no}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                 Blood Group
                </TextLabel>
                <TextInput
                  fullWidth
                  id='blood_group'
                  name='blood_group'
                  variant='outlined'
                  placeholder='Enter Blood Group'
                  {...formik.getFieldProps('blood_group')}
                  className={styles.TextField}
                  error={formik.touched.blood_group && Boolean(formik.errors.blood_group)}
                  helperText={formik.touched.blood_group && formik.errors.blood_group}
                />
            </Grid>

            <Grid item xs={12}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Notes
                </TextLabel>
                <TextInput
                  fullWidth
                  id='notes'
                  name='notes'
                  variant='outlined'
                  placeholder='Enter Notes'
                  {...formik.getFieldProps('notes')}
                  className={styles.TextArea}
                  multiline
                  rows={4}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
          </Grid>
          </Grid>
          </Grid>

          </Grid>

        </DialogContent>
      <DialogActions className='dialog-actions-dense' sx={{ position: 'fixed', maxWidth: '930px', padding: '1rem !important', left: 0, right: 0, bottom: "10%", margin: { xs: '0 32px', md: 'auto'}, background: '#fff'}}>
          <ButtonIcon type='submit' color='orange' sx={{ width: '100%' }}>
            Save
          </ButtonIcon>
        </DialogActions>
      </form>

    </Dialog>
  )
}

export default Modal
