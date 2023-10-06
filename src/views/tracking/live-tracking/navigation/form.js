/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'


function NavigationForm(props) {
  const { formik } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { id: '1', label: 'Account 1',  },
    { id: '2', label: 'Account 2'  }
  ]

  const typeOptions = [
    { id: '1', label: 'Type 1',  },
    { id: '2', label: 'Type 2'  }
  ]

  const assetOptions = [
    { id: '1', label: 'Asset 1',  },
    { id: '2', label: 'Asset 2'  }
  ]

  const geofenceOptions = [
    { id: '1', label: 'Geofence 1',  },
    { id: '2', label: 'Geofence 2'  }
  ]

  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>

          <Grid item xs={12} >
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                    From
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='starting_point'
                  name='starting_point'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Starting Point'
                  className={styles.TextField}
                  {...formik.getFieldProps('starting_point')}
                  error={formik.touched.starting_point && Boolean(formik.errors.starting_point)}
                  helperText={formik.touched.starting_point && formik.errors.starting_point}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                  To 
                </TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='ending_point'
                  name='ending_point'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Ending Point'
                  className={styles.TextField}
                  {...formik.getFieldProps('ending_point')}
                  error={formik.touched.ending_point && Boolean(formik.errors.ending_point)}
                  helperText={formik.touched.ending_point && formik.errors.ending_point}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} textAlign="right" sx={{display: 'flex', gap: '10px', justifyContent: 'end'}}>
          <ButtonIcon
              sx={{ width: 120 }}
              color='grey'
              iconWidth={30}
              iconHeight={'auto'}
              startIcon="radix-icons:cross-2"
              onClick={() => formik.resetForm()}
            >
             Clear
            </ButtonIcon>

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
      </form>
  )
}

export default NavigationForm
