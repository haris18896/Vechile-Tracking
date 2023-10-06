/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Box, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'
import { Icon } from '@iconify/react'



function SearchAssetForm(props) {
  const { formik, showAsset } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1',  },
    { id: '2', label: 'Account 2'  }
  ]

  const assetOptions = [
    { id: '1', label: 'Asset 1',  },
    { id: '2', label: 'Asset 2'  }
  ]



  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                  Account
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='account'
                  name='account'
                  options={accountOptions && accountOptions}

                  // disabled={!formik.values.country_id}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('account', value?.label)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                    }
                  }}
                  value={accountOptions?.find(account => account.label === formik.values.account)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Account'
                      error={formik.touched.account && Boolean(formik.errors.account)}
                      helperText={formik.touched.account && formik.errors.account}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Asset Name
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_name'
                  name='asset_name'
                  options={assetOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_name', value?.label)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                    }
                  }}
                  value={assetOptions?.find(asset => asset.label === formik.values.asset_name)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset'
                      error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                      helperText={formik.touched.asset_name && formik.errors.asset_name}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} textAlign="right" sx={{display: 'flex', gap: '10px', justifyContent: 'end'}}>
            <ButtonIcon
              sx={{ width: 120 }}
              color='success-outlined'
              iconWidth={30}
              iconHeight={'auto'}
              onClick={formik.handleSubmit}
            >
             Search
            </ButtonIcon>
          </Grid>
        </Grid>

        {showAsset && <Box sx={{ flex: 1}}>            
          <Grid container spacing={6}>

          <Grid item mt={20} xs={12}>
            <Typography sx={{ color: '#00ABBE', fontWeight:'600', fontSize: '1rem'}}>Live Update</Typography>
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Status</Typography>  
                <CustomChip
                size='medium'
                skin='light'
                sx={{
                  padding: '0.2rem 0.4rem',
                  flex: 1,
                  height: '28px',
                  '& .MuiChip-label': {
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textOverflow: 'unset'
                  }
                }}
                color="error"
                label="STOPPED"
          />    
          </Grid>


          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Status</Typography>  
                <CustomChip
                size='small'
                skin='light'
                color={chipStatus['on']?.color}
                label={
                  <Icon
                    icon={chipStatus['on']?.icon}
                    width='15'
                    height='15'
                    color={chipStatus['on']?.color}
                  />
                }
                sx={{
                  padding: '0.9rem 0rem',
                  margin: 'auto'
                }}
            />   
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Speed</Typography>  
                <Typography sx={{ fontSize: '0.875rem', color: '#C0C5D0'}} >0.8 KM/H</Typography>          
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Date & Time</Typography>  
                <Typography sx={{  fontSize: '0.875rem', color: '#C0C5D0'}} >2021-05-01T12:30:00</Typography>          
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Last Location</Typography>  
                <Typography sx={{  fontSize: '0.875rem', color: '#C0C5D0'}} >King Fahad Road, Riyadh, Saudi Arabia</Typography>          
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Lube Oil Level</Typography>  
                <Typography sx={{  fontSize: '0.875rem', color: '#C0C5D0'}} >N/A</Typography>          
          </Grid>

          <Grid item xs={6} sm={4}>
                <Typography sx={{ fontWeight:'600', fontSize: '0.875rem'}} mb={2}>Last Route</Typography>  
                <CustomChip
              size='small'
              label={<Icon icon='mdi:map-marker' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem'
              }}
            />         
          </Grid>


        </Grid>
        </Box> }
      </form>
  )
}

export default SearchAssetForm
