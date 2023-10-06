// ** MUI Components
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
  LinkStyled,
  BoxWrapper,
  LeftWrapper,
  RightWrapper,
  RightWrapperBox,
  TypographyStyled,
  LoginIllustration,
  LoginIllustrationWrapper
} from 'src/styles/pages/login/index'
import { useTranslation } from 'react-i18next'

const SuccessSignup = () => {
  const { t } = useTranslation()
  // ** States
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings



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
              <TypographyStyled>Success</TypographyStyled>
            </Box>
            <Title>Please check your email for further verification.</Title>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <LinkStyled href='/login'>
                <Icon icon='mdi:chevron-left' fontSize='2rem' />
                <span>Back to login</span>
              </LinkStyled>
            </Typography>
          </BoxWrapper>
        </RightWrapperBox>
      </RightWrapper>
    </Box>
  )
}
SuccessSignup.getLayout = page => <BlankLayout>{page}</BlankLayout>
SuccessSignup.guestGuard = true

export default SuccessSignup
