import React, { memo, useState } from 'react'

// ** Third Part Packages
import PropTypes from 'prop-types'
import classNames from 'classnames'

// ** Utils
import { NoSpaceAtFirstPosition } from 'src/utilities/utils'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'

// ** Mui Imports
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import { PasswordWrapper } from '../../styles/common'
import IconButton from '@mui/material/IconButton'

function PasswordElement(props) {
  const {
    type,
    size,
    label,
    error,
    variant,
    required,
    inputName,
    fullWidth,
    helperText,
    placeholder,
    formikError,
    backendError,
    formikTouched,
    inputClassName,
    errorClassName,
    labelClassName,
    maxCharacters,
    ...rest
  } = props

  const [showPassword, setShowPassword] = useState(false)

  return (
    <FieldWrapper>
      <TextLabel
        id={`${inputName}-label`}
        htmlFor={inputName}
        className={classNames({
          [labelClassName]: labelClassName
        })}
      >
        {label}&nbsp;{required && <span style={{ color: 'red' }}>*</span>}
      </TextLabel>
      <PasswordWrapper
        id={inputName}
        size={size}
        error={error}
        name={inputName}
        variant={variant}
        fullWidth={fullWidth}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        className={classNames({
          [inputClassName]: inputClassName
        })}
        inputProps={{
          onKeyPress: NoSpaceAtFirstPosition,
          maxLength: maxCharacters
        }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
              <Icon
                // className={classes.icon}
                icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                fontSize={20}
              />
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
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

export default memo(PasswordElement)

PasswordElement.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,

  error: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  formikTouched: PropTypes.bool,

  formikError: PropTypes.any,
  backendError: PropTypes.any,

  maxCharacters: PropTypes.number,

  helperText: PropTypes.node
}
