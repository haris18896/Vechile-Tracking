/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Box, Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { Icon } from '@iconify/react'



function DistanceMeasureForm(props) {
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

  const zoneOptions = [
    { id: '1', label: 'Zone 1',  },
    { id: '2', label: 'Zone 2'  }
  ]

  const usersOptions = [
    { id: '1', label: 'User 1',  },
    { id: '2', label: 'User 2'  }
  ]

  const vehicleGroupsOptions = [
    { id: '1', label: 'Vehicle Group 1',  },
    { id: '2', label: 'Vehicle Group 2'  }
  ]


  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} display="flex" alignItems="start">
            <Grid item xs={10.5}>
              <FieldWrapper>
              <TextInput
                  fullWidth
                  max={10}
                  id='start_point'
                  name='start_point'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='7649 52866, Saudi Arabia'
                  className={styles.TextField}
                  {...formik.getFieldProps('start_point')}
                  error={formik.touched.start_point && Boolean(formik.errors.start_point)}
                  helperText={formik.touched.start_point && formik.errors.start_point}
                />
              </FieldWrapper>
            </Grid>
            <Grid item xs={1.5} display="flex" justifyContent="end">
            <Button onClick={() => formik.setFieldValue("start_point", "")} sx={{ minWidth: '35px', height: '35px', borderRadius: '50%', background: '#FC3B611A', display: 'flex', justifyContent: 'center', alignItems:'center', padding: '0'}}>
                  <Icon icon="humbleicons:times" fontSize={25} color="#E53E3E" />
            </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="start">
            <Grid item xs={10.5} >
              <FieldWrapper>
              <TextInput
                  fullWidth
                  max={10}
                  id='end_point'
                  name='end_point'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='7649 52866, Saudi Arabia'
                  className={styles.TextField}
                  {...formik.getFieldProps('end_point')}
                  error={formik.touched.end_point && Boolean(formik.errors.end_point)}
                  helperText={formik.touched.end_point && formik.errors.end_point}
                />
              </FieldWrapper>
            </Grid>

            <Grid item xs={1.5} display="flex" justifyContent="end">
            <Button onClick={() => formik.setFieldValue("end_point", "")} sx={{ minWidth: '35px', height: '35px', padding: '0', borderRadius: '50%', background: '#FC3B611A', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                  <Icon icon="humbleicons:times" fontSize={25} color="#E53E3E" />
            </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={5}>
                <Grid container justifyContent="center">
                      <Grid item xs={4} display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Icon icon="solar:ruler-angular-bold" fontSize={25} />
                        <Typography sx={{fontSize: '0.875rem', color: '#C0C5D0', fontWeight:'500'}}>Total Distance</Typography> 
                        <Typography sx={{fontSize: '0.875rem', color: '#0F224B', fontWeight:'700'}}>1.79 KM</Typography> 
                      </Grid>

                      <Grid item xs={4} display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Icon icon="tabler:clock-hour-3" fontSize={25}  />
                        <Typography sx={{fontSize: '0.875rem', color: '#C0C5D0', fontWeight:'500'}}>Total Distance</Typography> 
                        <Typography sx={{fontSize: '0.875rem', color: '#0F224B', fontWeight:'700'}}>1.79 KM</Typography> 
                      </Grid>

                </Grid>
          </Grid>
        </Grid>
      </form>
  )
}

export default DistanceMeasureForm
