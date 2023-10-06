import React, { memo, Fragment } from 'react'

// ** Third Part Packages
import PropTypes from 'prop-types'
import classNames from 'classnames'

// ** MUI
import CloseIcon from '@mui/icons-material/Close'
import { Autocomplete, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ** Utils
import { NoSpaceAtFirstPosition } from 'src/utilities/utils'

// ** Custom Components
import { GroupHeader, GroupItems, useCommonStyles } from 'src/styles/common'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'

function SelectElement(props) {
  const {
    data = [],
    type,
    open,
    size,
    label,
    onOpen,
    loading,
    onClose,
    variant,
    required,
    onChange,
    disabled,
    inputName,
    fullWidth,
    placeholder,
    loadingSize,
    formikValue,
    formikError,
    onCloseClick,
    backendError,
    loadingColor,
    formikTouched,
    clearOnEscape,
    maxCharacters,

    labelClassName,
    ...rest
  } = props
  const styles = useCommonStyles()

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
      <Autocomplete
        type={type}
        size={size}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        name={inputName}
        loading={loading}
        variant={variant}
        disabled={disabled}
        onChange={onChange}
        fullWidth={fullWidth}
        id={`${inputName}-input`}
        clearOnEscape={clearOnEscape}
        className={styles.autoComplete}
        groupBy={option => option.firstLetter}
        getOptionLabel={option => option.label}
        value={data.find(item => item?.id === formikValue)}
        options={data.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        isOptionEqualToValue={(option, value) => option?.value === formikValue}
        renderInput={params => (
          <TextField
            {...params}
            variant={variant}
            placeholder={placeholder}
            helperText={(formikTouched && formikError) || backendError}
            error={(formikTouched && Boolean(formikError)) || Boolean(backendError)}
            InputProps={{
              ...params.InputProps,
              maxLength: maxCharacters,
              onKeyPress: NoSpaceAtFirstPosition,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color={loadingColor} size={loadingSize} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
        clearIcon={<CloseIcon size={20} color={'grey'} onClick={onCloseClick} />}
        renderGroup={params => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        {...rest}
      />
    </FieldWrapper>
  )
}

export default memo(SelectElement)

SelectElement.propTypes = {
  // ** Any
  data: PropTypes.any,
  formikValue: PropTypes.any,
  formikError: PropTypes.any,
  backendError: PropTypes.any,
  loadingColor: PropTypes.any,
  // ** String
  size: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
  labelClassName: PropTypes.string,
  // ** Numbers
  loadingSize: PropTypes.number,
  maxCharacters: PropTypes.number,
  // ** Functions
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onCloseClick: PropTypes.func,
  // ** Boolean
  open: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  formikTouched: PropTypes.bool,
  clearOnEscape: PropTypes.bool
}
