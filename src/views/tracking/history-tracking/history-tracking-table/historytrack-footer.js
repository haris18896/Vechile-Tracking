import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, FormControlLabel, ListItem, Menu, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/reports'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { exportOptions } from 'src/utilities/utils'
import { TrackingWrapper } from 'src/styles/pages/tracking'

function HistoryTrackFooter({ slug, onChangeHandler, customers, resetFrom, handleSubmit, speedometer }) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})
  const [err, setErr] = useState('')

  return (
    <TrackingWrapper>
      <Grid container justifyContent='end'>
        <FieldHorizontalWrapper sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <ButtonIcon
            sx={{ width: 120 }}
            color='grey'
            iconWidth={25}
            iconHeight={22}
            startIcon={'uil:times'}
            onClick={resetFrom}
          >
            Clear
          </ButtonIcon>
          {speedometer && (
            <>
              <ButtonIcon sx={{ width: 120, opacity: '0.5' }} color='primary-outlined'>
                Pause
              </ButtonIcon>

              <ButtonIcon sx={{ width: 120 }} color='primary-outlined'>
                Play
              </ButtonIcon>
            </>
          )}
          {!speedometer && (
            <ButtonIcon onClick={handleSubmit} sx={{ width: 120 }} color='primary-outlined'>
              Show
            </ButtonIcon>
          )}
        </FieldHorizontalWrapper>
      </Grid>
    </TrackingWrapper>
  )
}

export default HistoryTrackFooter

HistoryTrackFooter.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
