import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'


// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

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

function GprsAddHeader(props) {
  const { handleSubmit, handleReport, resetForm } = props
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <ServicesWrapper>
      <Grid container spacing={4} sx={{ alignItems: 'center' }}>

          <Grid item xs={12} sm mb={{ xs: 2, sm: 0 }}> 
            <HeaderLabel>GPRS Command</HeaderLabel>
          </Grid>

          <Grid item>
          <ButtonIcon 
            sx={{ width: 120 }}
            color='primary-outlined'
            iconWidth={25}
            iconHeight={25}
            startIcon={'system-uicons:document'}
            onClick={() => handleReport(true)}
          >
            Report
          </ButtonIcon>
          </Grid>

          <Grid item>
          <ButtonIcon
            sx={{ width: 120 }}
            color='success'
            iconWidth={30}
            iconHeight={'auto'}
            startIcon={'mingcute:send-plane-fill'}
            onClick={handleSubmit}
          >
            Send
          </ButtonIcon>
        </Grid>

        <Grid item>
        <ButtonIcon
          sx={{ width: 120 }}
          color='grey'
          iconWidth={30}
          iconHeight={20}
          startIcon={'prime:times'}
          onClick={resetForm}
        >
          Cancel
        </ButtonIcon>
        </Grid>

      </Grid>
    </ServicesWrapper>
  )
}

export default GprsAddHeader
