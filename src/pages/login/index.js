/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
// ** React Imports
import { useRouter } from 'next/router'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Translation
import { useTranslation } from 'react-i18next'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Utilities
import { NoSpaceAtFirstPosition, isObjEmpty } from 'src/utilities/utils'

// ** Styled Components
import {
  Title,
  useStyles,
  BoxWrapper,
  InputField,
  RightWrapper,
  PasswordField,
  FormControlLabel,
  TypographyStyled,
  LoginIllustration,
  TypographySubHeading,
  LoginIllustrationWrapper
} from 'src/styles/pages/login/index'
import styled from 'styled-components'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/store/authentication/authAction'

import { resetLoginError } from 'src/store/authentication/authSlice'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: 180,
    color: 'red',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: 'blue',
        marginRight: '1.5rem'
      },
      '&:active': {
        backgroundColor: 'gray'
      }
    }
  }
}))

const LoginPage = () => {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const router = useRouter()

  // ** redux
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  // ** Language Selector
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${t('auth.emailRequired')}`),
    password: Yup.string().required(`${t('auth.passwordRequired')}`),
    session: Yup.boolean()
  })

  // ** Handle Form Submit
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      session: false
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          email: values.email,
          password: values.password
        }

        dispatch(login({ data, router }))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetLoginError())
    }
  }, [])

  return (
    <Box className='login-wrapper'>
      {!hidden ? (
        <Box sx={{ flex: 0.6, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration alt='login-illustration' src={`/images/logos/logoTracking.png`} />
          </LoginIllustrationWrapper>
        </Box>
      ) : null}

      <RightWrapper
        sx={
          skin === 'bordered' && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : { flex: hidden ? 1 : 0.4 }
        }
      >
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
        >
          <BoxWrapper>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled>{t('auth.loginWelcome')}</TypographyStyled>
              <TypographySubHeading variant='body2'>{t('auth.loginTitle')}</TypographySubHeading>
            </Box>

            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Title>{t('auth.userName')}</Title>
                <InputField
                  id-={'emailField'}
                  type={'email'}
                  placeholder={t('auth.enterEmail')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  {...formik.getFieldProps('email')}
                  inputProps={{
                    onKeyPress: NoSpaceAtFirstPosition
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
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
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.password}</FormHelperText>
                )}
              </FormControl>

              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps('session')}
                      onChange={formik.handleChange}
                      name='session'
                      color='primary'
                    />
                  }
                  label={
                    <>
                      <Typography
                        variant='body2'
                        component='span'
                        sx={{
                          color: formik.touched.session && formik.errors.session ? 'error.main' : 'white'
                        }}
                      >
                        {t('auth.keepMeLoggedIn')}
                      </Typography>
                    </>
                  }
                />
                <Typography variant='body2' component={Link} href='/forgot-password' sx={{ color: 'white' }}>
                  {t('auth.forgotPassword')}
                </Typography>
              </Box>

              {error && typeof error === 'string' && (
                <FormHelperText
                  sx={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'error.main',
                    textAlign: 'center',
                    marginBottom: '5px'
                  }}
                >
                  {error}
                </FormHelperText>
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
                  {t('auth.signIn')}
                </Typography>
                {isRTL ? (
                  <Icon className={classes.iconLeft} icon={'ion:arrow-back'} fontSize={20} />
                ) : (
                  <Icon rotate={2} className={classes.iconRight} icon={'ion:arrow-back'} fontSize={20} />
                )}
              </Button>

              {/* forgot password and Register page link */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexWrap: 'wrap'
                }}
              >
                <Title>{t('auth.title')}</Title>
                <Title href='/register' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  &nbsp;{t('auth.signUpLink')}
                </Title>
              </Box>
              {/* <LanguageSelector /> */}
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  id='demo-customized-button'
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  variant='outlined'
                  disableElevation
                  onClick={handleClick}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      color: 'white'
                    }
                  }}
                  startIcon={
                    <Icon
                      className={classes.icon}
                      sx={{ marginRight: '0.5rem' }}
                      icon={'ph:globe-light'}
                      fontSize={24}
                    />
                  }
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {settings.direction === 'rtl' ? 'Arabic' : 'English'}
                </Button>

                <StyledMenu
                  id='demo-customized-menu'
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button'
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      i18n.changeLanguage('en')
                      saveSettings({ ...settings, direction: 'ltr' })
                    }}
                    disableRipple
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      i18n.changeLanguage('ar')
                      saveSettings({ ...settings, direction: 'rtl' })
                    }}
                    disableRipple
                  >
                    Arabic
                  </MenuItem>
                </StyledMenu>
              </div>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
