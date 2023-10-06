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
import { IconWrapper, PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Checkbox, FormControlLabel, Input, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { useCommonStyles } from 'src/styles/common'

function OrderManagementHeader(props) {
  const { changeHandler,values, data, redirectURL } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles()
  const router = useRouter()

  // ========= Options =========
  const accountOptions = data?.map(account => {
    return {
      label: account.customer,
      id: account.id
    }
  })

  const vehicleOptions = data?.map(veh => {
    return {
      label: veh.vehicle_id,
      id: veh.id
    }
  })

  // Destructuring values
  const { account, vehicle_id} = values

  return (
    <ServicesWrapper>
      <Grid container spacing={4} xs={{ alignItems: 'center' }}>

          <Grid item xs={12} sm>
            <Title>Work Order List</Title>
          </Grid>

          <Grid item xs={12} sm={3} lg={2}>
          <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(errors, value) => changeHandler('account', value?.id)}
              value={account ? (accountOptions ? accountOptions.find(data => data.id === account) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={12} sm={3} lg={2}>
          <Autocomplete
              fullWidth
              id='vehicle_id'
              name='vehicle_id'
              options={vehicleOptions || []}
              onChange={(e, value) => changeHandler('vehicle_id', value?.label)}
              value={vehicle_id ? (vehicleOptions ? vehicleOptions.find(data => data.label === vehicle_id) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Vehicle ID'
                />
              )}
              className={styles.AutoCompleteSelect}
            />
          </Grid>

           <Grid item>     
            <IconWrapper bg='#FF8B00' width='40px' height='40px' circle>
              <Icon icon='ic:round-search' width='22px' height='22px' color='#fff' />
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
        </Grid>
    </ServicesWrapper>
  )
}

export default OrderManagementHeader
