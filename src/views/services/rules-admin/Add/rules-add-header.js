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
import { Input, TextField } from '@mui/material'

function RulesAddHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, handleSubmit, redirectURL } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
  const router = useRouter()

  return (

    <ServicesWrapper>
    <Grid container spacing={4}>

    <Grid item xs={12} sm mb={{ xs: 2, sm: 0 }}>
    <Title>Rules Admin</Title>
    </Grid>

    <Grid item>
      <ButtonIcon
      sx={{ width: 120 }}
      color='grey'
      iconWidth={20}
      iconHeight={15}
      startIcon={'ic:round-arrow-back-ios-new'}
      onClick={() => router.back()}
      >
      Back
      </ButtonIcon>
      </Grid>

    <Grid item>
    <ButtonIcon
    sx={{ width: 120 }}
    color='success'
    iconWidth={30}
    iconHeight={'auto'}
    startIcon={'material-symbols:check-small-rounded'}
    onClick={handleSubmit}
    >
    Save
    </ButtonIcon>
    </Grid>

    <Grid item>
      <ButtonIcon
      sx={{ width: 120 }}
      color='grey'
      iconWidth={30}
      iconHeight={20}
      startIcon={'prime:times'}
      onClick={() => router.back()}
      >
      Cancel
      </ButtonIcon>
      </Grid>

    </Grid>
  </ServicesWrapper>
  )
}

export default RulesAddHeader
