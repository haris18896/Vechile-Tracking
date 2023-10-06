import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { Box } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'

function TestBenchModule({ formik }) {
  const styles = useCommonStyles()

  return (
    <form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} lg={3}>
            <FieldWrapper>
              <TextLabel id='imei-name' sx={{ marginBottom: '0.25rem' }}>
                Enter IMEI <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <TextInput
                fullWidth
                id='imei'
                name='imei'
                type='text'
                value={formik.values.imei}
                variant='outlined'
                placeholder='Enter IMEI No.'
                className={styles.TextField}
                onChange={(event, newValue) => {
                  formik.setFieldValue('imei', event.target.value)
                }}
                error={formik.touched.imei && Boolean(formik.errors.imei)}
                helperText={formik.touched.imei && formik.errors.imei}
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}

export default TestBenchModule

TestBenchModule.propTypes = {
  imei: PropTypes.string,
  onChangeHandler: PropTypes.func
}
