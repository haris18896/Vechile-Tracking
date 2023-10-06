/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useState, Fragment, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
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
  EmailField,
  LeftWrapper,
  RightWrapper,
  RightWrapperBox,
  FormControlLabel,
  TypographyStyled,
  SignUpWrapperBox,
  LoginIllustration,
  LoginIllustrationWrapper,
  InputField
} from 'src/styles/pages/login/index'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import ButtonIcon from '../../components/buttons/ButtonIcon'
import { ForgotPasswordAction } from '../../store/authentication/authAction'
import { isObjEmpty } from '../../utilities/utils'
import { resetForgotPassword } from '../../store/authentication/authSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { forgotPasswordPending, error } = useSelector(state => state.auth)
  const router = useRouter()

  const { t } = useTranslation()
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const classes = useStyles()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${t('auth.emailRequired')}`)
  })

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          email: values.email
        }

        dispatch(
          ForgotPasswordAction({
            data,
            callback: () => router.push('/login')
          })
        )
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetForgotPassword())
    }
  }, [])

  return (
    <Box className='login-wrapper'>
      {!hidden ? (
        <LeftWrapper>
          <LoginIllustrationWrapper>
            <LoginIllustration alt='login-illustration' src={`/images/logos/logoTracking.png`} />
          </LoginIllustrationWrapper>
        </LeftWrapper>
      ) : null}

      <RightWrapper
        sx={
          skin === 'bordered' && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : { flex: hidden ? 1 : 0.4 }
        }
      >
        <RightWrapperBox sx={{ mx: 6 }}>
          <BoxWrapper>
            <LogoBox>
              <img alt='logo' src={themeConfig.templateLogo} style={{ width: '40px', height: '40px' }} />
              <LogoTitle variant='h6'>{themeConfig.templateName}</LogoTitle>
            </LogoBox>

            <Box sx={{ mb: 6 }}>
              <TypographyStyled>{t('auth.signup.forgotPassword.forgotPassword')} 🔒</TypographyStyled>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <SignUpWrapperBox>
                <Title>{t('auth.signup.forgotPassword.title')}</Title>
              </SignUpWrapperBox>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Title>{t('auth.email')}</Title>
                <InputField
                  autoFocus
                  type={'email'}
                  id-={'emailField'}
                  placeholder={t('auth.enterEmail')}
                  error={(formik.touched.email && Boolean(formik.errors.email)) || Boolean(error?.email)}
                  {...formik.getFieldProps('email')}
                />
                {error?.email && <FormHelperText error>{error?.email}</FormHelperText>}
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <LinkStyled href='/login'>
                  <Icon icon='mdi:chevron-left' fontSize='2rem' />
                  <span>{t('auth.signup.forgotPassword.backToLogin')} </span>
                </LinkStyled>
              </Typography>

              {error && typeof error === 'string' && (
                <Typography ml={2} mb={3} varaint={'body2'} color={'error'}>
                  {error}
                </Typography>
              )}

              <ButtonIcon
                // sx={{ width: 120 }}
                fullWidth={true}
                color='orange'
                iconWidth={20}
                iconHeight={15}
                disabled={forgotPasswordPending}
                endIcon={forgotPasswordPending ? 'line-md:loading-twotone-loop' : 'material-symbols:arrow-right-alt'}
                onClick={() => formik.handleSubmit()}
              >
                {t('sendResetLink')}
              </ButtonIcon>
            </form>
          </BoxWrapper>
        </RightWrapperBox>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
