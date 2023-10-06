import React from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'

import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { Title } from 'src/styles/pages/settings'
import { TextInput, FieldWrapper, FieldHorizontalWrapper, SelectInput } from 'src/styles/components/input'
import { CatalogsWrapper, useCustomStyles } from 'src/styles/pages/catalogs'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Box, Menu, Select, TextField } from '@mui/material'
import { PlaceholderText, useCommonStyles } from 'src/styles/common'

import { exportOptions } from 'src/utilities/utils'
import { useState } from 'react'


function OfficeLocationHeader({ slug, onChangeHandler, office, account, ability, router }) {
  const customStyles = useCustomStyles()
  const styles = useCommonStyles();

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

  // Export
  const handleExportOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }



  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems='center' >
          <Grid item xs={12} md={3}>
            <Title>Office Location List</Title>
          </Grid>

          <Grid item xs={12} sm={6} md={2} marginLeft='auto'>
            <FieldWrapper sx={{ margin: '0', padding: '0' }}>
              <Select
                variant='outlined'
                displayEmpty
                value={account}
                placeholder='Select Account'
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={e => onChangeHandler('account', e.target.value)}
                className={customStyles.Select}
              >
                <MenuItem value=''>
                  <PlaceholderText>Select Account</PlaceholderText>
                </MenuItem>
                <MenuItem value='1'>Account 1</MenuItem>
                <MenuItem value='2'>Account 2</MenuItem>
                <MenuItem value='3'>Account 3</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FieldWrapper sx={{ margin: '0', padding: '0' }}>
              <TextField
                name='search'
                id='outlined-basic'
                variant='outlined'
                placeholder='Office Name'
                value={office}
                onChange={e => onChangeHandler('office', e.target.value)}
                className={customStyles.TextField}
              />
            </FieldWrapper>
          </Grid>

          {ability.can('create', 'create-office-location') && (
            <Grid item>
              <Grid container spacing={4}>
                <Grid item>
                  <ButtonIcon
                    sx={{ width: 100 }}
                    color='success'
                    startIcon={'ic:round-add'}
                    onClick={() => router.push(`/catalogs/office-location/edit/add`)}
                  >
                    Add
                  </ButtonIcon>
                </Grid>

                <Grid item>
                <div>
                  <ButtonIcon
                    sx={{ width: 120 }}
                    color='primary-outlined'
                    startIcon={'material-symbols:arrow-outward-rounded'}
                    onClick={handleClick}
                  >
                    Export
                  </ButtonIcon>

                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                    className={styles.exportStyles}
                  >
                    {exportOptions.map((item, index) => (
                      <MenuItem
                        onClick={handleExportOption}
                        sx={{ width: 120, display: 'flex', alignItems: 'center', gap: '10px' }}
                        key={item.name}
                        data-value={item.name}
                      >
                        {item.icon}
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </CatalogsWrapper>
  )
}

export default OfficeLocationHeader

OfficeLocationHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
