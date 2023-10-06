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

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'
import { IconWrapper, PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Checkbox, FormControlLabel, Input, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
import DatePicker from 'react-datepicker'

function PartManagementHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirectURL } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
  const router = useRouter()
  const datepickerStyles = useDatepickerStyles()

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

  // ========= States =========

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
      <Grid container xs={{ alignItems: 'center' }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'end',
            gap: '20px',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          <Grid sx={{ flex: '1' }}>
            <Title>Part List</Title>
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
              placeholder='Search by Part Number'
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper xs={{ display: 'flex' }}>
            <TextField
              name='assetName'
              id='outlined-basic'
              variant='outlined'
              placeholder='Search by Manufacturer'
              value={assetName}
              onChange={changeHandler}
              className={customStyles.TextField}
            ></TextField>
          </FieldHorizontalWrapper>

          <FieldHorizontalWrapper xs={{ display: 'flex' }}>
            <IconWrapper bg='#FF8B00' width='40px' height='40px' circle>
              <Icon icon='ic:round-search' width='22px' height='22px' color='#fff' />
            </IconWrapper>
          </FieldHorizontalWrapper>
          <ButtonIcon
            sx={{ width: 100 }}
            color='success'
            startIcon={'ic:round-add'}
            onClick={() => router.push(redirectURL)}
          >
            Add
          </ButtonIcon>
        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default PartManagementHeader
