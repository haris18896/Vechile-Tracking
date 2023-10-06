// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useRouter } from 'next/router'


// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const Forbidden = () => {
  const router = useRouter()

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1' sx={{ mb: 2.5 }}>
            403
          </Typography>
          <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            Forbidden 🔐
          </Typography>
          <Typography variant='body2'>The domain you are logging in doesn't exists.</Typography>
        </BoxWrapper>
        <Img alt='error-illustration' src='/images/pages/500.png' />

        <Button
          onClick={() => {
            localStorage.clear()
            router.replace('/login')
          }}
          variant='contained'
          sx={{ px: 5.5, mt: 2, background: '#C53030' }}
        >
          Go Back
        </Button>
      </Box>
      <FooterIllustrations image='/images/pages/misc-401-object.png' />
    </Box>
  )
}

Forbidden.getLayout = page => <BlankLayout>{page}</BlankLayout>
Forbidden.guestGuard = true

export default Forbidden
