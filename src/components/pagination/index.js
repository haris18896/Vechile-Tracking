import React from 'react'

// ** MUI
import { Grid, tableContainerClasses } from '@mui/material'
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Styles
import { useStyles } from 'src/styles/common'

// ** Third Party Imports
import PropTypes from 'prop-types'

function ReactPagination({ limit, handleLimit, page, total, handlePagination, height, swipe }) {
  const classes = useStyles()

  return (
    <Grid
      height={height}
      container
      spacing={2}
      className={classes.paginationComponent + ' pagination'}
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Grid item xs={12} sm={5}>
        <Pagination
          page={page}
          siblingCount={1}
          color='secondary'
          showLastButton={true}
          showFirstButton={true}
          onChange={handlePagination}
          count={Math.ceil(total / limit)}
        />
      </Grid>

      <Grid
        item
        xs={6}
        sm={swipe ? 4 : 5}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <FormControl>
          <InputLabel htmlFor='outlined-age-native-simple'>Limit</InputLabel>
          <Select
            native
            label='Limit'
            value={limit}
            onChange={handleLimit}
            inputProps={{
              name: 'Limit',
              id: 'outlined-age-native-simple'
            }}
            sx={{
              // padding : '6px 14px' of input
              '& .MuiInputBase-input': {
                padding: '6px 14px'
              }
            }}
          >
            <option value={10}>10 Items</option>
            <option value={25}>25 Items</option>
            <option value={50}>50 Items</option>
            <option value={100}>100 Items</option>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={6}
        sm={swipe ? 3 : 2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Records : {total}
      </Grid>
    </Grid>
  )
}

ReactPagination.propTypes = {
  limit: PropTypes.number,
  handleLimit: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number,
  handlePagination: PropTypes.func
}

export default ReactPagination
