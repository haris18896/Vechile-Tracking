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

function FuelDetailHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirectURL } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles()
  const router = useRouter()

  // ========= Options =========

  const accountOptions = [
    { label: 'Tracking', slug: 'track-11' },
    { label: 'Tracking2', slug: 'track-12' }
  ]


  const [values, setValues] = useState({
    account: '',
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { account } = values

  return (
    <ServicesWrapper>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>

          <Grid item xs={12} md={4}>
            <Title>Fuel Details List</Title>
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
            onChange={changeHandler}
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

export default FuelDetailHeader
