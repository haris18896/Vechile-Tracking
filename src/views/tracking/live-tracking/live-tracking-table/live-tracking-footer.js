import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { PlaceholderText } from 'src/styles/pages/reports'
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** utils
import { Icon } from '@iconify/react'

// ** Google Map
import { TrackingWrapper } from 'src/styles/pages/tracking'

// ** Formik
import { useFormik } from 'formik'

function LiveTrackingFooter({ setRefresh }) {
  const styles = useCustomStyles()

  // ** State
  const [refreshPlay, setRefreshPlay] = useState(false)
  const [refreshTime, setRefreshTime] = useState(10)

  // ** Formik for getting the vehicle value in live tracking header
  const formik = useFormik({
    initialValues: {
      refresh: refreshTime
    },
    enableReinitialize: true,
    onSubmit: values => {}
  })

  // ** Form Validation
  useEffect(() => {
    let timer

    if (formik.values.refresh === 0) {
      setRefresh(true)
      setRefreshPlay(false)
      formik.setFieldValue('refresh', refreshTime)
    }

    if (formik.values.refresh > 0 && refreshPlay) {
      timer = setTimeout(() => {
        formik.setFieldValue('refresh', formik.values.refresh - 1)
      }, 1000)
    }

    // ** Clear the timer when the component unmounts or when the dependencies change
    return () => clearTimeout(timer)
  }, [formik.values.refresh, refreshPlay])

  // ========= Options =========
  const refreshOptions = [
    { value: 'Select', id: 1 },
    { value: 10, id: 1 },
    { value: 30, id: 2 },
    { value: 60, id: 3 }
  ]

  return (
    <TrackingWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent='space-between' alignItems='center' rowSpacing={4} xs={12} sm={12}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Grid xs={12} sm={8} md={8}>
              <Select
                variant='outlined'
                value={refreshTime}
                name='refresh'
                onChange={e => {
                  formik.setFieldValue('refresh', parseInt(e.target.value, 10))
                  setRefreshTime(e.target.value)
                }}
                className={styles.Select}
                fullWidth
                placeholder='Select Refresh Interval'
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '0.6rem 1rem',
                    color: `black !important`,
                    fontSize: '0.875rem'
                  }
                }}
              >
                {refreshOptions.map((data, index) =>
                  index === 0 ? (
                    <MenuItem key={index} value=''>
                      <PlaceholderText>Set Refresh</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={index} value={data.value}>
                      {data.value}
                    </MenuItem>
                  )
                )}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Grid container columnSpacing={2} alignItems='center' justifyContent='center'>
              <Grid item display='flex'>
                <Icon icon='material-symbols:timer-outline-sharp' color='#2FC17E' fontSize={25} />
                <Typography ml={2} sx={{ fontWeight: '500' }}>
                  Next Refresh
                </Typography>
              </Grid>
              <Grid item width={48}>
                <Typography sx={{ fontWeight: '600', color: '#2FC17E' }}>
                  00:{formik.values.refresh < 10 ? 0 : null}
                  {formik.values.refresh}
                </Typography>
              </Grid>
              <Grid item display='flex' sx={{ cursor: 'pointer' }}>
                <Icon
                  onClick={() => setRefreshPlay(!refreshPlay)}
                  style={
                    refreshPlay
                      ? { cursor: 'pointer', transition: '.2s all ease' }
                      : { cursor: 'pointer', transition: '.2s all ease' }
                  }
                  icon={
                    refreshPlay
                      ? 'material-symbols:pause-circle-outline-rounded'
                      : 'material-symbols:play-circle-rounded'
                  }
                  color={refreshPlay ? '#FC3B61' : '#2FC17E'}
                  fontSize={25}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={3} alignItems='center' justifyContent='center'>
              <Grid item>
                <ButtonIcon
                  sx={{
                    width: { xs: 188, sm: 172, lg: 185 },
                    fontSize: { xs: '0.8rem', lg: '0.875rem' },
                    '&.MuiButtonBase-root': {
                      padding: '0.25rem 1.2rem'
                    }
                  }}
                  color='primary-outlined'
                  startIcon={'material-symbols:arrow-outward-rounded'}

                  // onClick={handleClick}
                >
                  Export Details
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </TrackingWrapper>
  )
}

export default LiveTrackingFooter

LiveTrackingFooter.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
