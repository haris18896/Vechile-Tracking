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
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'
import { PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Box, Input, TextField } from '@mui/material'

function FuelAddHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirectURL, formik } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const { pathname } = router;

  return (
    <ServicesWrapper>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center">

          <Grid item xs={12} sm={4} mb={2}>
          <HeaderLabel>{pathname === "/services/fuel-details/[id]" ? 'Edit Fuel Details' : 'Add Fuel Details'}</HeaderLabel>
          </Grid>

          <Grid item ml={{ sx: '0', sm: "auto" }}>
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
            onClick={formik.handleSubmit}
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
      </Box>
    </ServicesWrapper>
  )
}

export default FuelAddHeader
