import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { GraphsWrapper, PlaceholderText, useCustomStyles } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'

function MaxspeedHeader({ slug, onChangeHandler, values }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { account, all, assetName, date } = values

  return (
    <GraphsWrapper bordered>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={8} lg={7} xl={6} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              {/*<Grid item xs={10} sm={5} md={3.5}>*/}
              {/*  <Autocomplete*/}
              {/*    id='account'*/}
              {/*    name='account'*/}
              {/*    options={accountOptions}*/}
              {/*    getOptionLabel={option => option.label}*/}
              {/*    onChange={(e, value) => onChangeHandler('account', value)}*/}
              {/*    value={accountOptions?.find(account => account.name === account)}*/}
              {/*    renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Account' />}*/}
              {/*    className={styles.AutoCompleteSelect}*/}
              {/*  />*/}
              {/*</Grid>*/}

              <Grid item xs={2} sm={1} md={1}>
                <FormControlLabel
                  control={<Checkbox defaultValue={all} onChange={(e, value) => onChangeHandler('all', value)} />}
                  label={<Typography sx={{ fontWeight: '600', textAlign: 'center' }}>All</Typography>}
                />
              </Grid>

              {/*<Grid item xs={12} sm={6} md={3.5}>*/}
              {/*  <Autocomplete*/}
              {/*    id='assetName'*/}
              {/*    name='assetName'*/}
              {/*    options={assetOptions}*/}
              {/*    getOptionLabel={option => option.label}*/}
              {/*    onChange={(e, value) => onChangeHandler('assetName', value)}*/}
              {/*    value={assetOptions?.find(asset => asset.name === assetName)}*/}
              {/*    renderInput={params => <TextField {...params} variant='outlined' placeholder='Asset Name' />}*/}
              {/*    className={styles.AutoCompleteSelect}*/}
              {/*  />*/}
              {/*</Grid>*/}

              <Grid item xs={12} sm={6} md={3.5}>
                <DatePicker
                  selected={date}
                  id=''
                  className={datepickerStyles.datepicker}
                  placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                  onChange={date => onChangeHandler('date', date)}
                  dateFormat='yyyy-MM-dd'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={() => handleOpen()}>
                  Show
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ marginLeft: 0 }}
                  color='primary-outlined'
                  startIcon={'tabler:arrow-narrow-down'}
                  onClick={() => handleOpen()}
                >
                  Download Chart
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </GraphsWrapper>
  )
}

export default MaxspeedHeader

MaxspeedHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
