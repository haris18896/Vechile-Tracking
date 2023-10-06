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
import { exportOptions } from 'src/utilities/data'


// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Input, TextField ,Menu } from '@mui/material'

function PoiManagementHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirect } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
  const router = useRouter()

  const accountOptions = customers?.map(data => {
    return { label: data.customer,
              value: data.id
    }
  })

 // Exports

  // const handleExportOption = event => {

  //   const { value } = event.currentTarget.dataset
  // }

  // const [anchorEl, setAnchorEl] = useState(null)

  // const openMenu = Boolean(anchorEl)

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleCloseMenu = () => {
  //   setAnchorEl(null)
  // }

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

  const trackDataOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  // ========= States =========
  const [date, setDate] = useState('')

  const [values, setValues] = useState({
    trackVal: '',
    assetName: '',
    time: ''
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { trackVal, assetName, time } = values

  return (
    <ServicesWrapper>
      <Grid container spacing={2} xs={{ alignItems: 'center' }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          <Grid sx={{ flex: '1' }}>
            <Title>POI Management</Title>
          </Grid>

          <FieldHorizontalWrapper xs={{ display: 'flex' }}>
            <Select
              variant='outlined'
              displayEmpty
              value={trackVal}
              name='trackVal'
              onChange={changeHandler}
              className={customStyles.Select}
            >
              {trackDataOptions?.map((data, index) =>
                index === 0 ? (
                  <MenuItem key={index} value=''>
                    <PlaceholderText>Select Account</PlaceholderText>
                  </MenuItem>
                ) : (
                  <MenuItem key={index} value={data.slug}>
                    {data.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper xs={{ display: 'flex' }}>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='Search by POI Name'
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <ButtonIcon sx={{ width: 120 }} color='success' onClick={() => router.push('/services/poi-management/edit')}>
            Show
          </ButtonIcon>
          <ButtonIcon
            color='primary-outlined'
            startIcon={'material-symbols:arrow-outward-rounded'}
            onClick={(e) => handleClick(e)}
          >
            Export
          </ButtonIcon>
          {/* <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          className={customStyles.exportStyles}
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
        </Menu> */}
        </Grid>

        {/* 
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <FieldHorizontalWrapper>
            <Select
              fullWidth
              id='customer_type'
              name='customer_type'
              variant='outlined'
              label='Customer Type'
              value={slug}
              onChange={e => onChangeHandler('customer_type', e.target.value)}
              className={customStyles.Select}
            >
              {customers?.map((customer, index) => (
                <MenuItem key={index} value={customer.slug}>
                  {customer.company_name}
                </MenuItem>
              ))}
            </Select>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper>
            <ButtonIcon color='success' startIcon={'ic:baseline-plus'} onClick={() => handleOpen()}>
              Register Asset Type
            </ButtonIcon>
          </FieldHorizontalWrapper>

          <AddFormDialog
            id='assets-types-Modal'
            title='Add Asset Type'
            context='Enter asset type name to register new asset type'
            close={() => handleClose()}
            open={open}
            submit={() => formik.handleSubmit()}
            agree='Add'
            cancel='Cancel'
          >
            <form name='asset-type-name' onSubmit={formik.handleSubmit}>
              <FieldWrapper>
                <TextLabel id='asset-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Name
                </TextLabel>
                <TextInput
                  fullWidth
                  id='name'
                  name='name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Point Of Contact Email'
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FieldWrapper>

              <FieldWrapper>
                <TextLabel id='asset-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Customer Type
                </TextLabel>
                <Select
                  fullWidth
                  id='slug'
                  name='slug'
                  variant='outlined'
                  className={customStyles.Select}
                  {...formik.getFieldProps('slug')}
                  error={formik.touched.slug && Boolean(formik.errors.slug)}
                >
                  {customers?.map((customer, index) => (
                    <MenuItem key={index} value={customer.slug}>
                      {customer?.company_name}
                    </MenuItem>
                  ))}
                </Select>
              </FieldWrapper>
            </form>
          </AddFormDialog>
        </Grid> */}
      </Grid>
    </ServicesWrapper>
  )
}

export default PoiManagementHeader
