import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'

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
import { useCommonStyles } from 'src/styles/common'
import { GraphsWrapper, PlaceholderText, useCustomStyles } from 'src/styles/pages/graphs'
import { FieldHorizontalWrapper } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

function DistanceHeader({ slug, onChangeHandler, customers, values }) {
  const styles = useCommonStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Destructure values
  const { account, assetName, all, from_date, to_date} = values

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  let assetOptions = customers?.map(item => {
    return { id: item.id, label: item.company_name }
  })

  return (
    <GraphsWrapper bordered>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={10} xl={8} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={2} sm={1} md={1}>
                <FormControlLabel
                  control={<Checkbox defaultValue={all} onChange={(e,value) => onChangeHandler("all", value) } />}
                  label={<Typography sx={{ fontWeight: '600', textAlign: 'center' }}>All</Typography>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2.5}>
              <Autocomplete
                  id='assetName'
                  name='assetName'
                  options={assetOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e,value) => onChangeHandler("assetName", value)}
                  value={assetOptions?.find(asset => asset.name === assetName)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Asset Name'
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container alignItems='center'  columnSpacing={2}>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' sx={{ fontWeight: '600', textAlign: 'center' }}>
                      From Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={7.5}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={from_date}
                        id=''
                        className={datepickerStyles.datepicker}
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        onChange={(date) => onChangeHandler("from_date", date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container alignItems='center'>
                  <Grid item xs={12} sm={1} md={1.5}>
                    <Typography variant='body' sx={{ fontWeight: '600', textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={11} md={7.5}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={to_date}
                        id=''
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        className={datepickerStyles.datepicker}
                        onChange={(date) => onChangeHandler("to_date", date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 200 }}
                  startIcon={'ph:arrows-vertical-duotone'}
                  color='primary-outlined'
                  onClick={() => handleOpen()}
                >
                  Vertical Chart
                </ButtonIcon>
              </Grid>

              <Grid item>
                <ButtonIcon
                  sx={{ width: 220 }}
                  color='primary-outlined'
                  startIcon={'ph:arrows-horizontal-duotone'}
                  onClick={() => handleOpen()}
                >
                  Horizontal Chart
                </ButtonIcon>
              </Grid>

              <Grid item>
                <ButtonIcon
                  sx={{ width: 200 }}
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

export default DistanceHeader

DistanceHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
