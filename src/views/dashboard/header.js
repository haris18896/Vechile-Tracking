import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

// ** MUI
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/reports'
import { TextInput } from 'src/styles/components/input'

// ** utils
import { Icon } from '@iconify/react'

// ** Google Map
import { TrackingWrapper } from 'src/styles/pages/tracking'

function TableHeader({ formik, callback }) {
  const styles = useCustomStyles()

  const onChangeHandler = e => {
    formik.handleChange(e)
    if (e.target.value === '' && e.nativeEvent.inputType === 'deleteContentBackward') {
      callback()
    }
  }

  return (
    <TrackingWrapper sx={{ padding: '1rem 0', margin: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent='start' spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              id='name'
              name='name'
              placeholder='Search by Vehicle Name'
              variant='outlined'
              value={formik?.values?.vehicleName}
              onChange={onChangeHandler}
              className={styles.TextField}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '0.5rem 0.3rem 0.5rem 1rem !important',
                  fontSize: '0.7rem'
                }
              }}
              InputProps={{
                endAdornment: <Icon icon='bx:bx-search' width='20' height='20' />
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => formik.handleSubmit()}
              style={{ backgroundColor: '#0F224B', borderRadius: '50px', color: 'white' }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TrackingWrapper>
  )
}

export default TableHeader

TableHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
