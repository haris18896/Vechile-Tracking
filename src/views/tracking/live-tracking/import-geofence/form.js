/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'


function ImportGeofenceForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    {  label: 'Account 1', value: 'account 1'  },
    {  label: 'Account 2', value: 'account 2'  }
  ]

  const typeOptions = [
    { id: '1', label: 'Type 1',  },
    { id: '2', label: 'Type 2'  }
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
                  options={accountOptions}

                  // disabled={!formik.values.country_id}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('account', e.target.value)
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

          <Grid item xs={12} >
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                  Select File
                </TextLabel>

                <Grid item sx={{ display: 'flex', gap: '10px'}}>
                <TextField
                  fullWidth
                  max={10}
                  id='file'
                  name='file'
                  type='text'
                  variant='outlined'
                  placeholder=''
                  className={styles.TextField}
                  sx={{ flex: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                />
                <Button
                variant="contained"
                component="label"
                sx={{ background: '#FF8B00', borderRadius:'50px', flex: 0.3, boxShadow: 'none',
                    "&.MuiButtonBase-root:hover":{
                      backgroundColor: '#e57d00'
                    }
              }}
              >
                Browse
                <input
                  type="file"
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                  hidden
                />
              </Button>
              </Grid>
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', gap: '10px', justifyContent: 'end'}}>
          <ButtonIcon
              sx={{ width: 120 }}
              color='grey'
              iconWidth={30}
              iconHeight={'auto'}
              onClick={formik.handleSubmit}
            >
             Sample
            </ButtonIcon>
            <ButtonIcon
              sx={{ width: 120 }}
              color='success-outlined'
              iconWidth={30}
              iconHeight={'auto'}
              onClick={formik.handleSubmit}
            >
             Upload
            </ButtonIcon>
          </Grid>

        </Grid>
      </form>
  )
}

export default ImportGeofenceForm
