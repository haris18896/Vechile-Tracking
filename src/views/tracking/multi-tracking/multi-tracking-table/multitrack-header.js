import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Checkbox, FormControlLabel, ListItem, Menu, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { TextField } from '@mui/material'
import { TrackingWrapper } from 'src/styles/pages/tracking'
import { Box } from '@mui/system'

function MultiTrackHeader({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({})

  // ** Form Values
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  // ========= Options =========
  const trackDataOptions = [
    { label: 'Tracking', value: 'track-11' },
    { label: 'Tracking2', value: 'track-12' },
    { label: 'Tracking3', value: 'track-13' }
  ]

  // ========= States =========
  const [values, setValues] = useState({
    account: {}
  })

  // Change Handler
  const changeHandler = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { account } = values

  return (
    <TrackingWrapper>
      <Box sx={{ flexGrow: 1 }} mt='64px'>
        <Grid container alignItems='center' px={{ xs: 3, md: 5 }} spacing={1}>
          <Grid item xs={12} sm={3}>
            <Typography variant='body' sx={{ fontWeight: '600' }}>
              Account
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={trackDataOptions}
              getOptionLabel={option => option.label}
              onChange={(e, value) => changeHandler('account', value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.speed && formik.errors.speed && '#E53E3E !important'
                }
              }}
              value={trackDataOptions?.find(account => account.label === account)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                  error={formik.touched.speed && Boolean(formik.errors.speed)}
                  helperText={formik.touched.speed && formik.errors.speed}
                />
              )}
              className={common.AutoCompleteSelect}
            />
          </Grid>
        </Grid>
      </Box>
    </TrackingWrapper>
  )
}

export default MultiTrackHeader

MultiTrackHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
