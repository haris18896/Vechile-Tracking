import React from 'react'
import PropTypes from 'prop-types'

// ** third Party
import moment from 'moment'
import classNames from 'classnames'

// ** MUI
import dayjs from 'dayjs'
import FormHelperText from '@mui/material/FormHelperText'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// ** Custom Components
import { useCommonStyles } from 'src/styles/common'
import { FieldWrapper, TextLabel } from 'src/styles/components/input'

function DatePickerElement(props) {
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
    inputRef = null,
    loading = false,
    disabled = false,
    autoFocus = false,
    disablePast = false,
    disableFuture = false,
    style,
    ...rest
  } = props

  const styles = useCommonStyles()

  return (
    <FieldWrapper style={style}>
      <TextLabel
        id={`${inputName}-label`}
        htmlFor={inputName}
        className={classNames({
          [labelClassName]: labelClassName
        })}
      >
        {label}&nbsp;{required && <span style={{ color: 'red' }}>*</span>}
      </TextLabel>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...rest}
          format={format}
          name={inputName}
          maxDate={maxDate}
          loading={loading}
          minDate={minDate}
          inputRef={inputRef}
          onChange={onChange}
          disabled={disabled}
          isRequired={required}
          autoFocus={autoFocus}
          fullWidth={fullWidth}
          disablePast={disablePast}
          value={dayjs(formikValue)}
          renderLoading={renderLoading}
          disableFuture={disableFuture}
          className={styles.MuiDatePicker}
          isInvalid={Boolean(formikError) || Boolean(backendError)}
        />
      </LocalizationProvider>

      {formikTouched && Boolean(formikError) && (
        <FormHelperText
          className={classNames({
            'in-valid ml-1': true,
            [errorClassName]: errorClassName
          })}
          sx={{ color: 'error.main' }}
        >
          {formikError}
        </FormHelperText>
      )}
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
    </FieldWrapper>
  )
}

export default DatePickerElement

DatePickerElement.prototype = {
  label: PropTypes.string,
  format: PropTypes.string,
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
  required: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  formikTouched: PropTypes.bool
}
