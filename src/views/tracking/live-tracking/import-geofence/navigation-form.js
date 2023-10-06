/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { Icon } from '@iconify/react'

function NavigationForm(props) {
  const { formik, clearDistance } = props

  const styles = useCommonStyles()

  const accountOptions = [
    { label: 'Account 1', value: 'account 1' },
    { label: 'Account 2', value: 'account 2' }
  ]

  const typeOptions = [
    { id: '1', label: 'Type 1' },
    { id: '2', label: 'Type 2' }
  ]

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>From</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='start_point'
                name='start_point'

                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Starting Point'
                className={styles.TextField}
                {...formik.getFieldProps('start_point')}
                error={formik.touched.start_point && Boolean(formik.errors.start_point)}
                helperText={formik.touched.start_point && formik.errors.start_point}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>To</TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='end_point'
                name='end_point'

                // disabled={!formik.values.lat}
                type='text'
                variant='outlined'
                placeholder='Ending Point'
                className={styles.TextField}
                {...formik.getFieldProps('end_point')}
                error={formik.touched.end_point && Boolean(formik.errors.end_point)}
                helperText={formik.touched.end_point && formik.errors.end_point}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <ButtonIcon
            sx={{ width: 120 }}
            color='grey'
            iconWidth={30}
            iconHeight={'auto'}
            startIcon={'uil:times'}
            onClick={clearDistance}
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
