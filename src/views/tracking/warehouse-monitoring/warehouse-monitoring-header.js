import React, { useState } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Components
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'
import { SettingsWrapper } from 'src/styles/pages/settings'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { Autocomplete, Menu, MenuItem, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'
import { useCustomStyles } from 'src/styles/pages/reports'
import { exportOptions } from 'src/utilities/utils'

function WarehouseMonitoringHeader({ account, onChangeHandler, ability }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()

  const accountsList = [
    {
      value: '1',
      label: 'Account 1'
    },
    {
      value: '2',
      label: 'Account 2'
    },
    {
      value: '3',
      label: 'Account 3'
    }
  ]

  // Export options
  const handleExportOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <SettingsWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} sm sx={{ marginBottom: '0.5rem' }}>
          <HeaderLabel>Warehouse Monitoring</HeaderLabel>
        </Grid>

        <Grid item xs={12} sm={3} md={2.5} lg={2}>
          <Autocomplete
            fullWidth
            id='account'
            name='account'
            disabled={!accountsList.length}
            options={accountsList}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={option => option.label}
            onChange={(e, value) => {
              onChangeHandler('account', value?.value)
            }}
            value={accountsList?.find(account => account.value === account)}
            renderInput={params => <TextField {...params} variant='outlined' placeholder='Select Account' />}
            className={styles.AutoCompleteSelect}
          />
        </Grid>

        <Grid item>
          <ButtonIcon color='success' startIcon={'material-symbols:arrow-outward-rounded'} onClick={handleClick}>
            Export
          </ButtonIcon>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            className={customStyles.exportStyles}
          >
            {exportOptions.map((item, index) => (
              <MenuItem
                onClick={handleExportOption}
                sx={{ width: 120, display: 'flex', alignItems: 'center', gap: '10px' }}
                key={item.name}
                data-value={item.name}
              >
                {item.icon}
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default WarehouseMonitoringHeader
