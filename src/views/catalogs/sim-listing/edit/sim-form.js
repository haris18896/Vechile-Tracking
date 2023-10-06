import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Custom Components
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetAction } from 'src/store/catalogs/assets/assetsActions'

function SimForm({ formik }) {
  const styles = useCustomStyles()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Asset Selector
  const assets = useSelector(state => state?.assets?.getAllAssetList?.data)

  // ** Asset List
  const assetList = assets?.map(asset => {
    return {
      value: asset.id,
      label: asset.name
    }
  })

  console.log(assets, 'asset')

  useEffect(() => {
    // ** Asset info fetch
    dispatch(
      getAllAssetAction({
        page: '1',
        limit: 'all'
      })
    )
  }, [])

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      // prevent space character from being entered
      event.preventDefault()
    }
  }

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={9}>
            <FieldWrapper>
              <TextLabel id='email-template-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                SIM No. <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='sim_no'
                name='sim_no'
                type='text'
                placeholder='Enter SIM Number'
                {...formik.getFieldProps('sim_no')}
                className={styles.TextField}
                error={formik.touched.sim_no && Boolean(formik.errors.sim_no)}
                helperText={formik.touched.sim_no && formik.errors.sim_no}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={9}>
            <FieldWrapper>
              <TextLabel id='email-template-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                Serial No. <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='serial_no'
                name='serial_no'
                type='text'
                placeholder='Enter Serial Number'
                {...formik.getFieldProps('serial_no')}
                className={styles.TextField}
                error={formik.touched.serial_no && Boolean(formik.errors.serial_no)}
                helperText={formik.touched.serial_no && formik.errors.serial_no}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={9}>
            <FieldWrapper>
              <TextLabel id='email-template-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                Service Provider <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='service_provider'
                name='service_provider'
                type='text'
                placeholder='Enter Service Provider Name'
                {...formik.getFieldProps('service_provider')}
                className={styles.TextField}
                error={formik.touched.service_provider && Boolean(formik.errors.service_provider)}
                helperText={formik.touched.service_provider && formik.errors.service_provider}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={8}>
            <FieldWrapper>
              <TextLabel id='asset-id' sx={{ marginBottom: '0.25rem' }}>
                Asset Name <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <Autocomplete
                fullWidth
                id='asset_id'
                name='asset_id'
                options={assetList ?? []}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('asset_id', value?.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.asset_id && formik.errors.asset_id && '#E53E3E !important'
                  }
                }}
                value={assetList?.find(customer => customer.value === parseInt(formik.values.asset_id))}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Asset'
                    error={formik.touched.asset_id && Boolean(formik.errors.asset_id)}
                    helperText={formik.touched.asset_id && formik.errors.asset_id}
                  />
                )}
                className={styles.AutoCompleteSelect}
                inputProps={{
                  onKeyPress: handleKeyPress
                }}
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default SimForm
