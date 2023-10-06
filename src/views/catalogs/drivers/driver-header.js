import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { CatalogsWrapper, IconWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import { Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper, TextInput } from 'src/styles/components/input'
import { Autocomplete, Box, TextField } from '@mui/material'

function DriverHeader(props) {
  const { router, customers, slug, onChangeHandler, inputValue, ability, customerId, redirectWasl } = props

  const common = useCustomStyles()
  const customStyles = useCustomStyles()

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is a required field'),
    mobileNo: Yup.string().email().required('Mobile No. is a required field'),
    customer_id: Yup.string().required('Customer Id is a required field')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      name: '',
      mobileNo: '',
      customer_id: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          mobileNo: values.mobileNo,

          customer_id: values.customer_id,
          password: values.password,
          c_password: values.c_password
        }

        dispatch(registerUserAction(data))
        handleClose()
        resetForm()
      }
    }
  })

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(getAllRolesAction({ page: 1, limit: 100, customer_id: formik.values.customer_id }))
    }
  }, [formik.values.customer_id])

  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} xs={{ alignItems: 'center' }}>
          <Grid item md={2}>
            <Title>Driver List</Title>
          </Grid>

          <Grid item md={6} display='flex' flexWrap='wrap' marginLeft={{ md: 'auto' }}>
            <Grid container>
              <Grid item xs={12} sm={6} xl={4}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='brand'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search By Driver Name'
                    className={common.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <FieldHorizontalWrapper>
                  <TextField
                    name='brand'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Search By Mobile No'
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                    className={common.TextField}
                  ></TextField>
                </FieldHorizontalWrapper>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <FieldHorizontalWrapper>
                  <Autocomplete
                    id='customer_id'
                    name='customer_id'
                    options={
                      customers
                        ? customers.map(item => {
                            return { id: item.id, label: item.company_name }
                          })
                        : []
                    }
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => onChangeHandler('customer_id', value?.id)}
                    value={customers?.find(customer => customer.id === customerId)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Account'
                        error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                        helperText={formik.touched.customer_id && formik.errors.customer_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                  />
                </FieldHorizontalWrapper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container spacing={2} flexWrap='wrap'>
              {ability.can('create', 'create-asset') && (
                <Grid item>
                  <ButtonIcon
                    color='primary-outlined'
                    sx={{ width: 120 }}
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push(`/catalogs/driver/add-edit/add`)}
                  >
                    Add
                  </ButtonIcon>
                </Grid>
              )}
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='success'
                  startIcon={'ic:baseline-plus'}
                  onClick={() => redirectWasl(true)}
                >
                  Wasl
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon color='success' startIcon={'lucide:refresh-cw'}>
                  Refresh
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  color='primary-outlined'
                  sx={{ width: 120 }}
                  startIcon={'material-symbols:arrow-outward-rounded'}
                  onClick={() => handleOpen()}
                >
                  Export
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CatalogsWrapper>
  )
}

export default DriverHeader

DriverHeader.propTypes = {
  slug: PropTypes.object || PropTypes.string,
  customers: PropTypes.array,
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func
}
