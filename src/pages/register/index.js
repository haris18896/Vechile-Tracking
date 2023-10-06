/* eslint-disable react-hooks/exhaustive-deps */

// ** React Imports
import React, { useState, Fragment, useEffect } from 'react'

// ** MUI
import { Autocomplete } from '@mui/material'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Utils
import { countries } from '../../utilities/data'
import { isObjEmpty, NoSpaceAtFirstPosition } from '../../utilities/utils'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

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

// ** Layout Imports
import {
  Title,
  LogoBox,
  LogoTitle,
  useStyles,
  BoxWrapper,
  InputField,
  LeftWrapper,
  RightWrapper,
  InputOutLine,
  PasswordField,
  RightWrapperBox,
  SignUpWrapperBox,
  TypographyStyled,
  FormControlLabel,
  LoginIllustration,
  LoginIllustrationWrapper
} from 'src/styles/pages/login/index'

import { useTranslation } from 'react-i18next'
import { useCommonStyles } from '../../styles/common'
import { FieldHorizontalFlex, FieldHorizontalWrapperBox } from '../../styles/components/input'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/authentication/authAction'
import { resetFieldState, resetRegisterUser } from '../../store/authentication/authSlice'

const Register = () => {
  const dispatch = useDispatch()
  const { registerPending, error } = useSelector(state => state.auth)

  const router = useRouter()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const classes = useStyles()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const styles = useCommonStyles()

  // ** Vars
  const { skin } = settings

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${t('auth.emailRequired')}`),
    country: Yup.string().required(`${t('auth.signup.countryRequired')}`),
    address: Yup.string().required(`${t('auth.signup.addressRequired')}`),
    firstName: Yup.string().required(`${t('auth.signup.firstnameRequired')}`),
    lastName: Yup.string().required(`${t('auth.signup.lastnameRequired')}`),
    subdomain: Yup.string().when('plan', {
      is: 'company',
      then: Yup.string()
        .test('alphabets', 'Only alphabets are allowed', value => /^[A-Za-z]+$/.test(value))
        .required('Company subdomain is required')
        .test('subdomain', 'Invalid domain', value => {
          if (!value) {
            return true
          }

          return validator.isAlpha(value)
        })
    }),
    company_name: Yup.string().when('plan', {
      is: 'company',
      then: Yup.string()
        // .test('alphabets', 'Only alphabets are allowed', value => /^[A-Za-z]+$/.test(value))
        .required('Company name is required')
    }),
    terms: Yup.bool()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
    password: Yup.string()
      .required(t('auth.passwordRequired'))
      .test('', `${t('auth.signup.passwordTest')}`, value => {
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
      }),
    // terms: bool().oneOf([true], 'You must accept the terms and conditions'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('login.passwordMatch'))
      .required(t('auth.signup.confirmPasswordRequired')),
    mobile: Yup.string()
      .min(10, 'Mobile number must be at least 11 digits')
      .required(`${t('auth.signup.numberRequired')}`)
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      country: '',
      subdomain: '',
      address: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      mobile: '',
      company_name: '',
      terms: false,
      plan: 'company'
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (!values.terms) {
        formik.setFieldError('terms', 'You must agree to the terms and conditions')
      } else if (isObjEmpty(formik.errors)) {
        const data = {
          plan: values.plan,
          name: `${values.firstName} ${values.lastName}`,
          address: values.address,
          mobile: values.mobile,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirmPassword,
          submitted: true
        }

        if (values.plan === 'company') {
          data.subdomain = values.subdomain
          data.company_name = values.company_name
        }

        dispatch(registerUser({ data, callback: () => router.push('/register/success-signup/') }))
      }
    }
  })

  const handleKeyPress = event => {
    const charCode = event.which || event.keyCode
    const isValidChar = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)

    if (!isValidChar) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    const { company_name } = formik.values
    const sanitizedCompanyName = company_name.replace(/[^a-zA-Z\s]/g, '')
    const subdomain = sanitizedCompanyName.replace(/\s/g, '')
    formik.setFieldValue('subdomain', subdomain)
  }, [formik.values.company_name])

  const countriesList = countries?.map(country => {
    return {
      value: country.id,
      label: country.name
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetRegisterUser())
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
            : { flex: hidden ? 1 : 0.5 }
        }
      >
        <RightWrapperBox sx={{ mx: 6 }}>
          <BoxWrapper>
            <LogoBox>
              <img alt='logo' src={themeConfig.templateLogo} style={{ width: '40px', height: '40px' }} />
              <LogoTitle variant='h6'>{themeConfig.templateName}</LogoTitle>
            </LogoBox>

            <Box sx={{ mb: 6 }}>
              <TypographyStyled>{t('auth.signup.signUp')}</TypographyStyled>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <FieldHorizontalFlex>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.plan === 'company'}
                      onChange={() => formik.setFieldValue('plan', 'company')}
                      name='plan'
                      color='primary'
                    />
                  }
                  label={t('auth.signup.company')}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.plan === 'individual'}
                      onChange={() => formik.setFieldValue('plan', 'individual')}
                      name='plan'
                      color='primary'
                    />
                  }
                  label={t('auth.signup.individual')}
                />
              </FieldHorizontalFlex>

              {formik.values.plan === 'company' && (
                <Fragment>
                  <FieldHorizontalFlex>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Title>{t('auth.signup.company')}</Title>
                      <InputField
                        name='company_name'
                        id='company_name'
                        type='text'
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        placeholder={t('auth.signup.enterCompany')}
                        inputProps={{
                          onKeyPress: NoSpaceAtFirstPosition
                        }}
                        error={
                          (formik.touched.company_name && Boolean(formik.errors.company_name)) ||
                          Boolean(error?.company_name)
                        }
                      />
                      {error?.company_name && <FormHelperText>{error?.company_name}</FormHelperText>}
                      {formik.touched.company_name && formik.errors.company_name && (
                        <FormHelperText error>{formik.errors.company_name}</FormHelperText>
                      )}
                    </FormControl>
                  </FieldHorizontalFlex>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Title>{t('auth.signup.subdomain')}</Title>
                    <InputOutLine
                      name='subdomain'
                      id='subdomain'
                      // type='secure'
                      value={formik.values.subdomain}
                      onChange={e => {
                        const inputValue = e.target.value
                        formik.setFieldValue('subdomain', inputValue)
                      }}
                      onFocus={() => dispatch(resetFieldState('subdomain'))}
                      onKeyPress={e => handleKeyPress(e)}
                      placeholder={t('auth.signup.enterDomain')}
                      error={
                        (formik.touched.subdomain && Boolean(formik.errors.subdomain)) || Boolean(error?.subdomain)
                      }
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography color={'primary.contrastText'} variant='body2'>
                            .tracking.me
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    {formik.touched.subdomain && formik.errors.subdomain && (
                      <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.subdomain}</FormHelperText>
                    )}

                    {Boolean(error?.subdomain) && (
                      <FormHelperText sx={{ color: 'error.main' }}>{error?.subdomain}</FormHelperText>
                    )}
                  </FormControl>
                </Fragment>
              )}

              <FieldHorizontalWrapperBox>
                <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
                  <Title>{t('auth.signup.firstname')}</Title>
                  <InputField
                    name='firstName'
                    id='firstName'
                    placeholder={t('auth.signup.enterFirstname')}
                    {...formik.getFieldProps('firstName')}
                    error={(formik.touched.firstName && Boolean(formik.errors.firstName)) || Boolean(error?.firstName)}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                  />
                  {error?.firstName && <FormHelperText>{error?.firstName}</FormHelperText>}
                  {formik.touched.firstName && formik.errors.firstName && (
                    <FormHelperText error>{formik.errors.firstName}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Title>{t('auth.signup.lastname')}</Title>
                  <InputField
                    name='lastName'
                    id='lastName'
                    placeholder={t('auth.signup.enterLastname')}
                    {...formik.getFieldProps('lastName')}
                    error={(formik.touched.lastName && Boolean(formik.errors.lastName)) || Boolean(error?.lastName)}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                  />
                  {error?.lastName && <FormHelperText>{error?.lastName}</FormHelperText>}
                  {formik.touched.lastName && formik.errors.lastName && (
                    <FormHelperText error>{formik.errors.lastName}</FormHelperText>
                  )}
                </FormControl>
              </FieldHorizontalWrapperBox>

              <FieldHorizontalWrapperBox>
                <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
                  <Title>{t('auth.email')}</Title>
                  <InputField
                    type={'email'}
                    placeholder={t('auth.enterEmail')}
                    onFocus={() => dispatch(resetFieldState('email'))}
                    {...formik.getFieldProps('email')}
                    error={(formik.touched.email && Boolean(formik.errors.email)) || Boolean(error?.email)}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                  />
                  {error?.email && <FormHelperText>{error?.email}</FormHelperText>}
                  {formik.touched.email && formik.errors.email && (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Title>{t('auth.signup.phone')}</Title>
                  <InputField
                    name='phone'
                    id='phone'
                    type={'number'}
                    placeholder={t('auth.signup.enterNumber')}
                    {...formik.getFieldProps('mobile')}
                    error={(formik.touched.mobile && Boolean(formik.errors.mobile)) || Boolean(error?.mobile)}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                  />
                  {error?.mobile && <FormHelperText>{error?.mobile}</FormHelperText>}
                  {formik.touched.mobile && formik.errors.mobile && (
                    <FormHelperText error>{formik.errors.mobile}</FormHelperText>
                  )}
                </FormControl>
              </FieldHorizontalWrapperBox>

              <FieldHorizontalWrapperBox>
                <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
                  <Title>{t('auth.signup.country')}</Title>
                  <Autocomplete
                    id='country'
                    name='country'
                    options={countriesList}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('country', value?.label)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        padding: '4px !important'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px !important',
                        color: 'white !important',
                        borderColor:
                          formik.touched.country && formik.errors.country ? '#E53E3E !important' : '#FFF !important'
                      },
                      '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
                        color: 'white !important',
                        fontSize: '0.875rem !important',
                        fontWeight: 500
                      },
                      '.MuiAutocomplete-option[data-focus="true"]': {
                        color: 'white !important'
                      }
                    }}
                    value={countriesList?.find(country => country.label === formik.values.country)}
                    className={styles.AutoCompleteSelect}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder={t('auth.signup.enterCountry')}
                        {...formik.getFieldProps('country')}
                        error={(formik.touched.country && Boolean(formik.errors.country)) || Boolean(error?.country)}
                      />
                    )}
                  />
                  {error?.country && <FormHelperText>{error?.country}</FormHelperText>}
                  {formik.touched.country && formik.errors.country && (
                    <FormHelperText error>{formik.errors.country}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Title>{t('auth.signup.address')}</Title>
                  <InputField
                    name='address'
                    id='address'
                    placeholder={t('auth.signup.enterAddress')}
                    {...formik.getFieldProps('address')}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                    error={(formik.touched.address && Boolean(formik.errors.address)) || Boolean(error?.address)}
                  />
                  {error?.address && <FormHelperText>{error?.address}</FormHelperText>}
                  {formik.touched.address && formik.errors.address && (
                    <FormHelperText error>{formik.errors.address}</FormHelperText>
                  )}
                </FormControl>
              </FieldHorizontalWrapperBox>

              <FieldHorizontalWrapperBox>
                <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
                  <Title>{t('auth.password')}</Title>
                  <PasswordField
                    placeholder={t('auth.enterPassword')}
                    id='password-field'
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
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

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Title>{t('auth.confirmPassword')}</Title>
                  <PasswordField
                    placeholder={t('auth.signup.enterConfirmPassword')}
                    id='confirm-password-field'
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('confirmPassword')}
                    inputProps={{
                      onKeyPress: NoSpaceAtFirstPosition
                    }}
                    error={
                      (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) ||
                      Boolean(error?.password_confirmation)
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.confirmPassword}</FormHelperText>
                  )}

                  {error?.password_confirmation && (
                    <FormHelperText sx={{ color: 'error.main' }}>{error?.password_confirmation}</FormHelperText>
                  )}
                </FormControl>
              </FieldHorizontalWrapperBox>

              <FormControl fullWidth sx={{ mb: 2, mx: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps('terms')}
                      checked={formik.values.terms}
                      onChange={formik.handleChange}
                      name='terms'
                      color='primary'
                      sx={{
                        borderColor: 'white !important',
                        '&:hover': {
                          borderColor: 'white !important'
                        }
                      }}
                    />
                  }
                  label={
                    <>
                      <Typography
                        variant='body2'
                        component='span'
                        sx={{
                          color: formik.touched.terms && formik.errors.terms ? 'error.main' : 'white'
                        }}
                      >
                        {t('auth.signup.agreeTerm')}{' '}
                      </Typography>
                      <Typography
                        href='/privacy-policy'
                        variant='body2'
                        component={Link}
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                        onClick={e => e.preventDefault()}
                      >
                        {t('auth.signup.privacy')}
                      </Typography>
                    </>
                  }
                />
                {formik.touched.terms && formik.errors.terms && (
                  <Typography variant='body2' sx={{ color: 'error.main' }}>
                    {formik.errors.terms}
                  </Typography>
                )}
              </FormControl>

              <SignUpWrapperBox>
                <Title>{t('auth.signup.title')}</Title>
                <Title href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  &nbsp;{t('auth.signup.signinInstead')}
                </Title>
              </SignUpWrapperBox>

              {error && typeof error === 'string' && (
                <Typography ml={2} mb={3} varaint={'body2'} color={'error'}>
                  {error}
                </Typography>
              )}

              <Button
                className={classes.button}
                fullWidth
                size='large'
                variant='contained'
                sx={{ mb: 7 }}
                onClick={() => formik.handleSubmit()}
                disabled={registerPending}
              >
                <Typography variant='body' sx={{ marginLeft: 'auto', fontSize: '13px' }}>
                  {t('auth.signup.signUp')}
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
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
