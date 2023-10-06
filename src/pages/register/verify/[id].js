// ** React Imports
import React, { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
// ** Next Import
import Link from 'next/link'

// ** Utils
import { isObjEmpty } from 'src/utilities/utils'

// ** MUI Components
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {
  Title,
  LogoBox,
  LogoTitle,
  useStyles,
  LinkStyled,
  BoxWrapper,
  InputField,
  EmailField,
  LeftWrapper,
  RightWrapper,
  RightWrapperBox,
  FormControlLabel,
  TypographyStyled,
  SignUpWrapperBox,
  LoginIllustration,
  LoginIllustrationWrapper
} from 'src/styles/pages/login/index'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { VerifyRegistrationAction } from '../../../store/authentication/authAction'
import Button from '@mui/material/Button'
import FallbackSpinner from 'src/@core/components/spinner'

const verify = () => {
  const dispatch = useDispatch()
  const { verifyRegistrationPending, error } = useSelector(state => state.auth)

  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const { id } = router?.query

  // ** Hooks
  const theme = useTheme()
  const classes = useStyles()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  useEffect(() => {
    if (id) {
      // Dispatch the action only when id is available
      dispatch(VerifyRegistrationAction({ id, callback: url => router.push(`${url}`) }))
    }
  }, [dispatch, id, router])

  const schema = Yup.object().shape({
    token: Yup.string().required('Token is required')
  })

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          token: values.token
        }

        dispatch(VerifyRegistrationAction({ data, callback: url => router.push(`${url}`) }))
      }
    }
  })

  return <FallbackSpinner />
}
verify.getLayout = page => <BlankLayout>{page}</BlankLayout>
verify.guestGuard = true

export default verify
