import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import { Autocomplete, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'

function SelectAutoComplete(props) {
  const { onChangeHandler, label, valueType, value, inputValueType, inputValue, options } = props
  const common = useCommonStyles()

  return (
    <Autocomplete
      fullWidth
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={value}
      onChange={(event, newValue) => {
        onChangeHandler(`${valueType}`, newValue)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        onChangeHandler(`${inputValueType}`, newInputValue)
      }}
      id='controllable-states'
      options={options}
      renderInput={params => <TextField {...params} placeholder={label} />}
      className={common.AutoCompleteSelect}

      // sx={{
      //   '& .MuiOutlinedInput-root': {
      //     borderRadius: '40px',
      //     paddingTop: '0px !important',
      //     paddingBottom: '0px !important'
      //   },
      //   '& .MuiOutlinedInput-notchedOutline': {
      //     borderColor: 'rgba(0, 0, 0, 0.23)'
      //   },
      //   '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      //     top: '0px !important'
      //   },
      //   '& .MuiInputLabel-outlined': {
      //     top: '-9px !important'
      //   }
      // }}
    />
  )
}

export default SelectAutoComplete

SelectAutoComplete.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  options: PropTypes.array,
  inputValue: PropTypes.any,
  valueType: PropTypes.string,
  onChangeHandler: PropTypes.func,
  inputValueType: PropTypes.string
}
