import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldWrapper, FieldHorizontalWrapper, SelectInput, TextInput } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { PlaceholderText } from 'src/styles/common'

function LiveLocationHeader({ slug, router, onChangeHandler, account, vehicleNo, ability }) {
  const common = useCustomStyles()

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

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>Locations List</Title>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={3} xl={2}>
              <FieldWrapper>
                <SelectInput
                  fullWidth
                  displayEmpty
                  value={account}
                  placeholder='Select Account'
                  inputProps={{ 'aria-label': 'Without label' }}
                  className={common.Select}
                  onChange={e => onChangeHandler('account', e.target.value)}
                >
                  <MenuItem value=''>
                    <PlaceholderText>Select Account</PlaceholderText>{' '}
                  </MenuItem>
                  <MenuItem value='1'>Account 1</MenuItem>
                  <MenuItem value='2'>Account 2</MenuItem>
                  <MenuItem value='3'>Account 3</MenuItem>
                </SelectInput>
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={2}>
              <FieldWrapper>
                <TextInput
                  fullWidth
                  name='vehicleNo'
                  value={vehicleNo}
                  className={common.TextField}
                  placeholder='Search by Vehicle No.'
                  onChange={e => onChangeHandler('vehicleNo', e.target.value)}
                />
              </FieldWrapper>
            </Grid>
            {ability.can('create', 'create-live-location') && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <FieldHorizontalWrapper>
                  <ButtonIcon
                    color='success'
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push('/catalogs/live-location/edit/add')}
                  >
                    Add
                  </ButtonIcon>
                </FieldHorizontalWrapper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default LiveLocationHeader

LiveLocationHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
