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
import { Autocomplete, Input, Menu, TextField } from '@mui/material'
import { useCommonStyles } from 'src/styles/common'
import { exportOptions } from 'src/utilities/utils'

function RulesAdminHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, values, redirectURL } = props
  const dispatch = useDispatch()
  const styles = useCommonStyles()
  const router = useRouter()

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Name of asset type is required'),
    slug: Yup.string().required('Slug is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          slug: values.slug
        }

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        dispatch(registerAssetTypeAction(data))
        resetForm()
        handleClose()
      }
    }
  })

  // ========= Options =========
  const accountOptions = customers?.map( customer =>{
    return {
      label: customer.account,
      id: customer.id
    }
  })

  // Destructuring values
  const { account } = values

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

  return (
    <ServicesWrapper>
      <Grid container spacing={4} xs={{ alignItems: 'center' }}>

          <Grid item xs={12} sm>
            <Title>Rules Admin</Title>
          </Grid>

          <Grid item xs={10} sm={3} md={2.5} lg={2}>
          <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(e, value) => onChangeHandler('account', value?.id)}
              value={account ? (accountOptions ? accountOptions.find(data => data.id === account) : '') : ''}
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
            onClick={handleClick}
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

export default RulesAdminHeader
