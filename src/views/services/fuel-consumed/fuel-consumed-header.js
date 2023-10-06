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
import { Autocomplete, Box, Input, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'
import { data } from 'src/pages/services'

function FuelConsumedHeader(props) {
  const { changeHandler, customers, values, redirectURL } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles()
  const router = useRouter()

  // ========= Options =========

  const accountOptions = customers?.map((data => {
    return{
      label: data.customer,
      value: data.id
    }

  }))

  // Destructuring values
  const { account } = values

  return (
    <ServicesWrapper>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={4}>

        <Grid item xs={12} md={4}>
          <Title>Fuel Consumed List</Title>
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2} ml={{ sx: '0', md: "auto" }}>
        <Autocomplete
          fullWidth
          displayEmpty
          id='account'
          name='account'
          variant='outlined'
          options={accountOptions || []}
          getOptionLabel={option => option.label}
          className={styles.AutoCompleteSelect}
          onChange={(event) => changeHandler(event)}
          value={accountOptions.find(account => account.label === account)}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              placeholder='Select account'
            />
          )}
        />
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
    </Box>
  </ServicesWrapper>
  )
}

export default FuelConsumedHeader
