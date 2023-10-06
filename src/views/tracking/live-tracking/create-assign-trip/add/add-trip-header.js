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
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'
import { PlaceholderText, SelectItem, ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { styled, useTheme } from '@mui/material/styles'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { registerAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Box, Input, InputAdornment, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

function AddTripHeader(props) {
  const { onChangeHandler, handleClose, handleOpen, customers, open, slug, redirectURL, title, clearMap, submitHandler } = props
  const dispatch = useDispatch()
  const customStyles = useCustomStyles()
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} lg={4} flexWrap='wrap' >
            <HeaderLabel>{title}</HeaderLabel>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={3}
              flexWrap='wrap'
              sx={{ justifyContent: { xs: 'start', lg: 'end' } }}
            >
              <Grid item>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Enter Location'
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Icon icon='material-symbols:location-on' color='#556485' width={18} />
                      </InputAdornment>
                    )
                  }}
                ></TextField>
              </Grid>

              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='grey'
                  iconWidth={20}
                  iconHeight={15}
                  startIcon={'ic:round-arrow-back-ios-new'}
                  onClick={() => router.back()}
                >
                  Back
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='grey'
                  iconWidth={22}
                  iconHeight={22}
                  startIcon={'ic:round-plus'}
                  onClick={() => router.back()}
                >
                  Add
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='success'
                  iconWidth={30}
                  iconHeight={'auto'}
                  startIcon={'material-symbols:check-small-rounded'}
                  onClick={submitHandler}
                >
                  Save
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  color='grey'
                  sx={{ width: 180 }}
                  iconWidth={30}
                  iconHeight={20}
                  startIcon={'prime:times'}
                  onClick={clearMap}
                >
                  Clear map
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ServicesWrapper>
  )
}

export default AddTripHeader
