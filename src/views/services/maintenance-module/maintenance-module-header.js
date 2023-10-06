import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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
import { PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Checkbox, FormControlLabel, Input, TextField, Typography } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'

function MaintenanceModuleHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirectURL } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
  const styles = useCommonStyles();
  const router = useRouter()

  const [values, setValues] = useState({
    account: '',
    asset_name: '',
    all: false
  })

  const {account, asset_name, all} = values;

  // ** Form Validation

  // ========= Options =========

  const trackDataOptions = [
    { label: 'Select', value: '' },
    { label: 'Tracking', value: 'track-11' },
    { label: 'Tracking2', value: 'track-12' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  // ========= States =========

  // Change Handler
  const changeHandler = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  return (
    <ServicesWrapper>
      <Grid container spacing={4} xs={{ alignItems: 'center' }}>

          <Grid item xs={12} sm>
            <Title>Maintenance Details</Title>
          </Grid>

          <Grid item xs={6} md={2}>
          {/* <Autocomplete
                      id='customer_type'
                      name='country'
                      options={time}
                      value={time.find((option) => option.value === formik.values.customer_id)}
                      onChange={(e, value) => {
                        formik.setFieldValue('customer_id', value?.value);
                      }}
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important',
                        borderWidth: '1px black !important',

                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px black !important',
                        color: 'black !important',
                        borderColor:
                          formik.touched.customer_id && formik.errors.customer_id ? '#E53E3E !important' : '#black !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'black !important'
                      }
                    }}
                    // value={countriesList?.find(country => country.label === formik.values.country)}
                    className={common.AutoCompleteSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Account'
                        {...formik.getFieldProps('customer_id')}
                        error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                        helperText={formik.touched.customer_id && formik.errors.customer_id}
                      />
                    )}                  
                  /> */}
          </Grid>

          <Grid item xs={6} md={2}>
          <Autocomplete
              fullWidth
              id='asset_name'
              name='asset_name'
              options={trackDataOptions || []}
              onChange={(e, value) => changeHandler('asset_name', value?.value)}
              value={asset_name ? (trackDataOptions ? trackDataOptions.find(data => data.value === asset_name) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Asset Name'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item>
          <FormControlLabel
              control={<Checkbox defaultValue={false} value={all} onChange={() => changeHandler('all', !all)} />}
              label={<Typography sx={{ fontWeight: '600', textAlign: 'center', color:'#4B5563' }}>All</Typography>}
            />
          </Grid>

          <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => handleOpen()}>
                  Show
                </ButtonIcon>
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
      </Grid>
    </ServicesWrapper>
  )
}

export default MaintenanceModuleHeader
