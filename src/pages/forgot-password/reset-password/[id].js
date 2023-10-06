/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import {
  Title,
  LogoBox,
  LogoTitle,
  useStyles,
  BoxWrapper,
  PasswordField,
  LeftWrapper,
  RightWrapper,
  RightWrapperBox,
  TypographyStyled,
  LoginIllustration,
  LoginIllustrationWrapper
} from 'src/styles/pages/login/index'
import { useTranslation } from 'react-i18next'

// ** Store and Actions
import { isObjEmpty } from 'src/utilities/utils'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPasswordAction } from 'src/store/authentication/authAction'
import { resetResetPassword } from 'src/store/authentication/authSlice'
import ButtonIcon from '../../../components/buttons/ButtonIcon'

const ResetPassword = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const { resetPasswordPending, error } = useSelector(state => state.auth)

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
    password: Yup.string()
      .required(t('login.passwordRequired'))
      .test(
        'strong-password',
        'Password must contain at least 8 characters, one number, one uppercase letter and one lowercase letter',
        value => {
          if (!value) {
            return true
          }

          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 0
          })
        }
      ),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('login.passwordMatch'))
      .required(t('login.confirmPasswordRequired'))
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      token: id || '',
      password_confirmation: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          password: values.password,
          token: values.token,
          password_confirmation: values.password_confirmation
        }

        dispatch(ResetPasswordAction({ data }))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetResetPassword())
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
              <TypographyStyled>{t('auth.signup.resetPassword.resetPassword')}</TypographyStyled>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Title>{t('auth.password')}</Title>
                <PasswordField
                  id='password-field'
                  placeholder={t('auth.passwordRequired')}
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          className={classes.icon}
                          icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.touched.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.password}</FormHelperText>
                )}

                {error?.password && <FormHelperText sx={{ color: 'error.main' }}>{error?.password}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 6 }}>
                <Title>{t('auth.confirmPassword')}</Title>
                <PasswordField
                  placeholder={t('auth.signup.enterConfirmPassword')}
                  id='password-field'
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password_confirmation')}
                  error={
                    (formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)) ||
                    Boolean(error?.password_confirmation)
                  }
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showConfirmPassword)}
                      >
                        <Icon
                          className={classes.icon}
                          icon={showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password_confirmation && formik.touched.password_confirmation && (
                  <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.password_confirmation}</FormHelperText>
                )}

                {error?.password_confirmation && (
                  <FormHelperText sx={{ color: 'error.main' }}>{error?.password_confirmation}</FormHelperText>
                )}
              </FormControl>

              {error && error?.token && <FormHelperText sx={{ color: 'error.main' }}>{error?.token}</FormHelperText>}

              {error && typeof error === 'string' && (
                <Typography ml={2} mb={3} varaint={'body2'} color={'error'}>
                  {error}
                </Typography>
              )}

              <Button
                className={classes.button}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 7 }}
                onClick={() => formik.handleSubmit()}
              >
                <Typography variant='body' sx={{ marginLeft: 'auto', fontSize: '13px' }}>
                  {t('Submit')}
                </Typography>
                {isRTL ? (
                  <Icon className={classes.iconLeft} icon={'ion:arrow-back'} fontSize={20} />
                ) : (
                  <Icon rotate={2} className={classes.iconRight} icon={'ion:arrow-back'} fontSize={20} />
                )}
              </Button>
            </form>
          </BoxWrapper>
        </RightWrapperBox>
      </RightWrapper>
    </Box>
  )
}
ResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ResetPassword.guestGuard = true

export default ResetPassword
