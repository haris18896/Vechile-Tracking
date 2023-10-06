import React, { useEffect, useState } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { IconWrapper, PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Box, Checkbox, DialogTitle, FormControlLabel, Input, Menu, MenuItem, TextField, Typography } from '@mui/material'

import { Icon } from '@iconify/react'
import { useCommonStyles } from 'src/styles/common'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { exportOptions } from 'src/utilities/utils'

function GeofenceHeader(props) {
  const { all, zone, zoneOptions, router, search, account, ability, accountOptions, onChangeHandler, redirectURL, handleShowAlert,handleCloseAlert, alert, userModal } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles()

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Geofence name is required'),
    slug: Yup.string().required('Slug is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          slug: values.slug
        }

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        dispatch(registerAssetTypeAction(data))
        resetForm()
        handleClose()
      }
    }
  })

  //Export Options
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

  const users = [
    {
      id: 1,
      name: 'John Doe 1',
      value: 'john.doe1'
    },
    {
      id: 2,
      name: 'Jane Doe 2',
      value: 'jane.doe'
    },
    {
      id: 3,
      name: 'John Doe 3',
      value: 'john.doe3'
    },
    {
      id: 4,
      name: 'Jane Doe 4',
      value: 'jane.doe4'
    }
  ]

  return (
    <SettingsWrapper>
      <Grid container spacing={4}>

        <Grid item xs={12} sm>
            <Title>Geofences List</Title>
          </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
            <Autocomplete
              fullWidth
              id='account'
              name='account'
              className={styles.AutoCompleteSelect}
              value={accountOptions.find(acc => acc?.label === account)}
              getOptionLabel={option => option?.label}
              variant='outlined'
              options={accountOptions || []}
              onChange={(event, newValue) => onChangeHandler('account', newValue?.label)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select account'
                />
              )}
            />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2.5} display="flex">
            <TextInput
              fullWidth
              id='search'
              name='search'
              placeholder='Search by Geofence Name'
              variant='outlined'
              className={styles.TextField}
              value={search}
              onChange={e => onChangeHandler('search', e.target.value)}
              sx={{ "&.MuiFormControl-root":{ flex: 1} }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={all}
                  onChange={e => onChangeHandler('all', e.target.checked)}
                  name='all'
                  color='primary'
                />
              }
              label='All'
              sx={{ marginLeft: '0.25rem' }}
            />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
            <Autocomplete
              fullWidth
              id='zone'
              name='zone'
              value={zoneOptions.find(z => z.value === zone)}
              getOptionLabel={option => option?.label}
              variant='outlined'
              options={zoneOptions || []}
              className={styles.AutoCompleteSelect}
              onChange={(event, newValue) => onChangeHandler('zone', newValue?.label)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Search by Zone'
                />
              )}
            />
        </Grid>

        <Grid item>
          <Grid container spacing={4}>
            <Grid item>
              <IconWrapper bg='#FF8B00' width='35px' height='35px' circle='true'>
                <Icon icon='ic:round-search' width='22px' height='22px' color='#fff' />
              </IconWrapper>
            </Grid>

            <Grid item>
              <IconWrapper bg='#0F224B' width='35px' height='35px' circle='true' onClick={handleShowAlert}>
                <Icon icon='bi:car-front-fill' width='18px' height='18px' color='#fff' />
              </IconWrapper>
            </Grid>


          <Grid item>
          <ButtonIcon
            sx={{ width: 100 }}
            color='success'
            startIcon={'ic:round-add'}
            onClick={() => router.push(redirectURL)}
          >
            Add
          </ButtonIcon>
          </Grid>

          {/* <Grid item>
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
            className={styles.exportStyles}
          >
            {exportOptions?.map((item, index) => (
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
     */}
            </Grid>
        </Grid>
      </Grid>

      <AddFormDialog
          id='update-Modal'
          close={handleCloseAlert}
          open={alert}
          submit={handleCloseAlert}
          agree='Okay'
          btnFull={true}
          context= {
              <Box sx={{display :'flex', alignItems: 'center', flexDirection: 'column'}} px={4}>
                <Icon icon="ph:warning" color='#ECC94B' fontSize={40} />
                <Typography mt={4} sx={{ fontWeight: '500', color: '#556485'}}>Please Select Geofence!</Typography>
              </Box>   }
        >
        </AddFormDialog>


        <AddFormDialog
              id='assign-user-Modal'
              title= {<Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                px={0}
              >
                  <DialogTitle sx={{ padding: 0, fontWeight: '600', color: '#556485' }}>
                  Assign Geofence To User
                  </DialogTitle>
                  <Icon
                    color="#000"
                    icon="uil:times"
                    width={25}
                    height={25}
                    style={{ cursor: 'pointer' }}
                    onClick={handleCloseAlert}
                  />

              </Box>}
              // title='Assign Geofence To User'
              // context={`Assign user to ${row?.geofenceName} Geofence`}
              close={handleCloseAlert}
              open={userModal}
              submit={() => formik.handleSubmit()}
              save='Save'
              btnFull={true}
              bg="#fff"
            >
              <form name='add-customer-type' onSubmit={formik.handleSubmit}>
                <FieldWrapper>
                  <TextLabel id='geofence-name' sx={{ marginBottom: '0.25rem' }}>
                    Geofence Name
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    variant='outlined'
                    className={styles.TextField}
                    placeholder='Enter Geofence Name'
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <TextLabel id='user-name' sx={{ marginBottom: '0.25rem' }}>
                    User
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='user'
                    name='user'
                    type='text'
                    variant='outlined'
                    placeholder='Select User'
                    className={styles.AutoCompleteSelect}
                    value={users.find(user => user.value === formik.values.user)}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('user', newValue?.value)
                    }}
                    error={formik.touched.user && Boolean(formik.errors.user)}
                    helperText={formik.touched.user && formik.errors.user}
                    options={users}
                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} variant='outlined' placeholder='Select User' />}
                  />
                </FieldWrapper>
              </form>
            </AddFormDialog>

    </SettingsWrapper>
  )
}

export default GeofenceHeader
