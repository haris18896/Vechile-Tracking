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
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { PlaceholderText, SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper, SelectInput } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

function InventoryHeader({ router, slug, onChangeHandler, warehouse, account, ability }) {
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
        ouse
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
      <Grid container spacing={4} justifyContent='space-between'>
        <Grid item xs={12} md={4} lg={2}>
          <Title>Inventory List</Title>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
                    <PlaceholderText>Select Account</PlaceholderText>
                  </MenuItem>
                  <MenuItem value='1'>Account 1</MenuItem>
                  <MenuItem value='2'>Account 2</MenuItem>
                  <MenuItem value='3'>Account 3</MenuItem>
                </SelectInput>
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <FieldWrapper>
                <SelectInput
                  fullWidth
                  displayEmpty
                  name='warehouse'
                  value={account}
                  placeholder='Select Warehouse'
                  inputProps={{ 'aria-label': 'Without label' }}
                  className={common.Select}
                  onChange={e => onChangeHandler('warehouse', e.target.value)}
                >
                  <MenuItem value=''>
                    <PlaceholderText>Select Warehouse</PlaceholderText>
                  </MenuItem>
                  <MenuItem value='1'>Warehouse 1</MenuItem>
                  <MenuItem value='2'>Warehouse 2</MenuItem>
                  <MenuItem value='3'>Warehouse 3</MenuItem>
                </SelectInput>
              </FieldWrapper>
            </Grid>

            {ability.can('create', 'create-inventory') && (
              <FieldHorizontalWrapper>
                <ButtonIcon
                  color='success'
                  startIcon={'ic:baseline-plus'}
                  onClick={() => router.push('/catalogs/inventory/edit/add')}
                >
                  Add
                </ButtonIcon>
              </FieldHorizontalWrapper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default InventoryHeader

InventoryHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
