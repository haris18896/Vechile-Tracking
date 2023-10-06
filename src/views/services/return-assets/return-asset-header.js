import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Autocomplete, Box, Input, Menu, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'
import { exportOptions } from 'src/utilities/utils'

function ReturnAssetHeader(props) {
  const { onChangeHandler, handleOpen, customers, open, slug, redirectURL, values, title } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles();
  const router = useRouter()

  const accountOptions = customers?.map(data => {
    return { label: data.customer,
              value: data.id
    }
  })

  //Export Options
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

  // Destructuring values
  const {account, driver_name, vehicle_no} = values;

  return (
  <ServicesWrapper>
    <Grid container spacing={4} xs={{ alignItems: 'center' }}>

        <Grid item xs={12} sm>
          <Title>{title}</Title>
        </Grid>

        <Grid item xs={6} md={2}>
        <Autocomplete
            fullWidth
            id='account'
            name='account'
            options={accountOptions || []}
            onChange={ (event, value) => onChangeHandler("account", value?.label)}
            value={account ? (accountOptions ? accountOptions.find(data => data.label === account) : '') : ''}
            sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'} }}
            renderInput={params => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Select Account'
              />
            )}
            className={styles.AutoCompleteSelect}
          />
        </Grid>

        <Grid item xs={6} md={2.5}>
          <TextField
            name='driver_name'
            id='outlined-basic'
            variant='outlined'
            placeholder='Search by Driver Name'
            value={driver_name}
            onChange={e => onChangeHandler("driver_name", e.target.value) }
            className={styles.TextField}
          ></TextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <TextField
            name='vehicle_no'
            id='outlined-basic'
            variant='outlined'
            placeholder='Search by Vehicle No.'
            value={vehicle_no}
            onChange={e => onChangeHandler("vehicle_no", e.target.value) }
            className={styles.TextField}
          ></TextField>
        </Grid>

        <Grid item>
        <ButtonIcon
          sx={{ width: 100 }}
          color='success'
          startIcon={'ic:round-add'}
          onClick={() => router.push(redirectURL)}
        >
          Add
        </ButtonIcon>
        </Grid>

        <Grid item>
        <ButtonIcon
          sx={{ width: 120 }}
          color='primary-outlined'
          startIcon={'material-symbols:arrow-outward-rounded'}
          onClick={(e) => handleClick(e)}
        >
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
          className={styles.exportStyles}
        >
          {exportOptions?.map((item, index) => (
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
  </ServicesWrapper>
  )
}

export default ReturnAssetHeader
