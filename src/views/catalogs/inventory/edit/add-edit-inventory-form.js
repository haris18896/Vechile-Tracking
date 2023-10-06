import React from 'react'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { useCommonStyles } from 'src/styles/common'

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    cursor: 'pointer !important'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)'
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px !important'
  },
  '& .MuiInputLabel-outlined': {
    top: '-9px !important'
  }

  // '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //   '&:hover fieldset': {
  //     borderColor: 'rgba(0, 0, 0, 0.23)',
  //     cursor: 'pointer'
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'rgba(0, 0, 0, 0.23)',
  //     cursor: 'pointer'
  //   }
  // }
}

const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const warehouses = [
  { name: 'Warehouse 1' },
  { name: 'Warehouse 2' },
  { name: 'Warehouse 3' },
  { name: 'Warehouse 4' },
  { name: 'Warehouse 5' }
]

const categories = [
  { name: 'Category 1' },
  { name: 'Category 2' },
  { name: 'Category 3' },
  { name: 'Category 4' },
  { name: 'Category 5' }
]

const types = [{ name: 'Type 1' }, { name: 'Type 2' }, { name: 'Type 3' }, { name: 'Type 4' }, { name: 'Type 5' }]

function AddEditInventoryForm({ router, formik }) {
  console.log('formik values : ', formik.values)
  console.log('formik errors : ', formik.errors)

  const common = useCommonStyles()

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accounts}
                  className={common.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('account', newValue.name)
                  }}
                  value={accounts.find(account => account.name === formik.values.account)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.account && Boolean(formik.errors.account)}
                      helperText={formik.touched.account && formik.errors.account}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Inventory Number <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='inventoryNumber'
                  name='inventoryNumber'
                  type='text'
                  variant='outlined'
                  placeholder='Enter inventory number'
                  {...formik.getFieldProps('inventoryNumber')}
                  className={common.TextField}
                  error={formik.touched.inventoryNumber && Boolean(formik.errors.inventoryNumber)}
                  helperText={formik.touched.inventoryNumber && formik.errors.inventoryNumber}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Warehouse <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='warehouse'
                  name='warehouse'
                  options={warehouses}
                  className={common.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('warehouse', newValue.name)
                  }}
                  value={warehouses.find(warehouse => warehouse.name === formik.values.warehouse)}
                  error={formik.touched.warehouse && Boolean(formik.errors.warehouse)}
                  helperText={formik.touched.warehouse && formik.errors.warehouse}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select warehouse'
                      error={formik.touched.warehouse && Boolean(formik.errors.warehouse)}
                      helperText={formik.touched.warehouse && formik.errors.warehouse}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Storing Category <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='storingCategory'
                  name='storingCategory'
                  options={categories}
                  className={common.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('storingCategory', newValue.name)
                  }}
                  value={categories.find(category => category.name === formik.values.storingCategory)}
                  error={formik.touched.storingCategory && Boolean(formik.errors.storingCategory)}
                  helperText={formik.touched.storingCategory && formik.errors.storingCategory}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select storing category'
                      error={formik.touched.storingCategory && Boolean(formik.errors.storingCategory)}
                      helperText={formik.touched.storingCategory && formik.errors.storingCategory}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='inventory-name' sx={{ marginBottom: '0.25rem' }}>
                  Inventory Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='inventoryName'
                  name='inventoryName'
                  type='text'
                  variant='outlined'
                  placeholder='Enter inventory name'
                  className={common.TextField}
                  {...formik.getFieldProps('inventoryName')}
                  error={formik.touched.inventoryName && Boolean(formik.errors.inventoryName)}
                  helperText={formik.touched.inventoryName && formik.errors.inventoryName}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Storing Type <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='storingType'
                  name='storingType'
                  options={types}
                  className={common.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('storingType', newValue.name)
                  }}
                  value={types.find(type => type.name === formik.values.storingType)}
                  error={formik.touched.storingType && Boolean(formik.errors.storingType)}
                  helperText={formik.touched.storingType && formik.errors.storingType}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select storing type'
                      error={formik.touched.storingType && Boolean(formik.errors.storingType)}
                      helperText={formik.touched.storingType && formik.errors.storingType}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid marginTop={10}>
            <ButtonIcon
              color='success'
              startIcon={'ic:baseline-plus'}
              onClick={() => router.push('/catalogs/inventory/edit/add/')}
            >
              Add Record
            </ButtonIcon>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditInventoryForm
