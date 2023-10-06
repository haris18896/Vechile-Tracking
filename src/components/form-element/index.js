import React, { memo } from 'react'

// ** Third Part Packages
import PropTypes from 'prop-types'
import classNames from 'classnames'

// ** Utils
import { NoSpaceAtFirstPosition } from 'src/utilities/utils'

// ** Custom Components
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'

function FormElement(props) {
  const {
    size,
    type,
    label,
    error,
    variant,
    required,
    inputName,
    fullWidth,
    helperText,
    placeholder,
    labelClassName,
    inputClassName,
    maxCharacters,
    ...rest
  } = props

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
      <TextInput
        size={size}
        type={type}
        error={error}
        name={inputName}
        variant={variant}
        fullWidth={fullWidth}
        helperText={helperText}
        placeholder={placeholder}
        className={classNames({
          [inputClassName]: inputClassName
        })}
        inputProps={{
          onKeyPress: NoSpaceAtFirstPosition,
          maxLength: maxCharacters
        }}
        {...rest}
      />
    </FieldWrapper>
  )
}

export default memo(FormElement)

FormElement.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,

  required: PropTypes.bool,
  fullWidth: PropTypes.bool,

  maxCharacters: PropTypes.number,

  error: PropTypes.bool,
  helperText: PropTypes.node
}
