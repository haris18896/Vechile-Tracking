import React from 'react'

// ** MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

// ** Styles
import { TextLabel } from 'src/styles/components/input'

// ** Third Party Imports
import PropTypes from 'prop-types'

function SelectMultiple({ name, initialData, values, data, handleChange }) {
  // ** Select Options
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  // ** Select Props
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }

  return (
    <Box sx={{ marginTop: '1.5rem' }}>
      <TextLabel id='role-permissions' sx={{ marginBottom: '0.25rem' }}>
        {name}
      </TextLabel>
      <FormControl fullWidth>
        <Select
          multiple
          value={values}
          MenuProps={MenuProps}
          placeholder='Select Permissions'
          id='demo-multiple-chip'
          onChange={handleChange}
          labelId='role-permissions'
          renderValue={selected => {
            // console.log('selected', selected)

            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map(value => {
                  const permission = data.find(item => item.id === value)

                  return <Chip key={value} label={permission.name} sx={{ m: 0.75 }} />
                })}
              </Box>
            )
          }}
        >
          {data.map(item => (
            <MenuItem key={item.id} value={parseInt(item.id)}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

SelectMultiple.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  data: PropTypes.array,
  initialData: PropTypes.array,
  handleChange: PropTypes.func
}

export default SelectMultiple
