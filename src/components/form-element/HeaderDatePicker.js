import React from 'react'
import PropTypes from 'prop-types'

// ** third Party
import moment from 'moment'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'

// ** MUI
import FormHelperText from '@mui/material/FormHelperText'
import { Grid, Typography } from '@mui/material'

// ** Custom Components
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

function HeaderDatePicker(props) {
  const {
    label,
    format,
    minDate,
    maxDate,
    required,
    fullWidth,
    onChange,
    inputName,
    formikValue,
    formikError,
    backendError,
    renderLoading,
    formikTouched,
    errorClassName,
    labelClassName,
    dateFormat,
    isRequired,
    placeHolder,
    inputRef = null,
    loading = false,
    disabled = false,
    autoFocus = false,
    disablePast = false,
    disableFuture = false,
    ...rest
  } = props

  const datepickerStyles = useDatepickerStyles()

  return (
    <>
      <Grid item xs={12} sm={4} md={4.5}>
        <Typography
          variant='body'
          id={`${inputName}-label`}
          className={classNames({
            [labelClassName]: labelClassName
          })}
          sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center' }}
        >
          {label}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={7} md={6}>
        <DatePickerWrapper>
          <DatePicker
            selected={formikValue}
            id={`${inputName}-date`}
            name={inputName}
            placeholderText={placeHolder}
            className={datepickerStyles.datepicker}
            onChange={onChange}
            dateFormat={dateFormat}
            isRequired={isRequired}
            fullWidth={fullWidth}
            disableFuture={disableFuture}
            disablePast={disablePast}
            inputRef={inputRef}
            {...rest}
          />
        </DatePickerWrapper>
      </Grid>
      <Grid xs={12} height='0.9rem' justifyContent='center'>
        {formikTouched && Boolean(formikError) && (
          <FormHelperText
            className={classNames({
              'in-valid ml-1': true,
              [errorClassName]: errorClassName
            })}
            sx={{ color: 'error.main', textAlign: 'end', alignItems: 'end' }}
          >
            {formikError}
          </FormHelperText>
        )}
      </Grid>
      {Boolean(backendError) && (
        <FormHelperText
          className={classNames({
            'is-invalid ml-1': true,
            [errorClassName]: errorClassName
          })}
          sx={{ color: 'error.main' }}
        >
          {backendError}
        </FormHelperText>
      )}
    </>
  )
}

export default HeaderDatePicker

HeaderDatePicker.prototype = {
  label: PropTypes.string,
  format: PropTypes.string,
  placeHolder: PropTypes.any,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  inputName: PropTypes.string,
  errorClassName: PropTypes.string,
  labelClassName: PropTypes.string,

  onChange: PropTypes.func,
  formikValue: PropTypes.any,
  formikError: PropTypes.any,
  backendError: PropTypes.any,
  renderLoading: PropTypes.element,

  inputRef: PropTypes.any,
  dateFormat: PropTypes.any,
  isRequired: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  formikTouched: PropTypes.bool
}
