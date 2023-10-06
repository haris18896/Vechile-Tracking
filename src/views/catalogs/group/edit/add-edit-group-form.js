import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** Redux Action and Slice
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'
import DataTable from 'react-data-table-component'

function AddEditGroupForm({ router, formik }) {
  // ** Style For Fields
  const styles = useCustomStyles()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** States and Selectors

  // ** Assets List -->
  const { getAllAssetList } = useSelector(state => state.assets)

  const assetList = getAllAssetList?.data?.map(asset => {
    return {
      label: asset.name,
      value: asset.id
    }
  })

  // ** Fetching Data For Autocomplete

  // ** Assets -->
  useEffect(() => {
    dispatch(getAllAssetAction({ page: 1, limit: 'all' }))
  }, [router])

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flex: 1 }}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                    Asset <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='deviceGroup'
                    name='deviceGroup'
                    variant='outlined'
                    placeholder='Search Asset'
                    {...formik.getFieldProps('deviceGroup')}
                    className={styles.TextField}
                    error={formik.touched.deviceGroup && Boolean(formik.errors.deviceGroup)}
                    helperText={formik.touched.deviceGroup && formik.errors.deviceGroup}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                    Device Group <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='deviceGroup'
                    name='deviceGroup'
                    variant='outlined'
                    placeholder='Enter Device Group Name'
                    {...formik.getFieldProps('deviceGroup')}
                    className={styles.TextField}
                    error={formik.touched.deviceGroup && Boolean(formik.errors.deviceGroup)}
                    helperText={formik.touched.deviceGroup && formik.errors.deviceGroup}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            {/* <Grid item xs={12} md={6}></Grid> */}

            <Grid item xs={12} md={6} display='flex' alignItems='end'>
              <Grid item xs={12} md={8}>
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ background: '#FF8B00', padding: '0.2rem 1rem', borderRadius: '50px' }}
                  mb={3}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultValue={false}
                        {...formik.getFieldProps('group_vehicles')}
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: '#fff'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontWeight: '600', color: '#fff', textAlign: 'center' }}>
                        Company Vehicles
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} display='flex' alignItems='end'>
              <Grid item xs={12} md={8}>
                <Grid
                  container
                  rowSpacing={1}
                  sx={{ background: '#FF8B00', padding: '0.2rem 1rem', borderRadius: '50px' }}
                  mb={3}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultValue={false}
                        {...formik.getFieldProps('group_vehicles')}
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: '#fff'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontWeight: '600', color: '#fff', textAlign: 'center' }}>
                        Group Vehicles
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} display='flex' alignItems='end'>
              <Grid item xs={12} md={8}>
                <DataTable
                  // columns={columns()}
                  data={['asset1', 'asset2']}
                  pointerOnHover
                  // progressPending={loading}
                  // rowsPerPage={limit}
                  // className={classes.table}
                  // progressComponent={<Spinner />}
                  // sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
                  selectableRows
                  noHeader
                  noTableHead
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditGroupForm
