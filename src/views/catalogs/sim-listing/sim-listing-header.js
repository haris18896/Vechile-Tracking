import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { PlaceholderText, useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper, SelectInput } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Image from 'next/image'

function SimListingHeader({ slug, onChangeHandler, sim, asset, ability }) {
  const styles = useCommonStyles()
  const router = useRouter()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({
    file: Yup.string().required('Excel File is required'),
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      file: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role
        ouse
        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>Sim List</Title>
        </Grid>

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
          <Grid container spacing={4} sx={{ justifyContent: 'flex-end' }}>
            <Grid item xs={12} sm={6} md={3} xl={2}>
              <FieldWrapper>
                <SelectInput
                  fullWidth
                  displayEmpty
                  value={asset}
                  placeholder='All'
                  inputProps={{ 'aria-label': 'Without label' }}
                  className={styles.Select}
                  onChange={e => onChangeHandler('asset', e.target.value)}
                >
                  <MenuItem value=''>
                    <PlaceholderText>All</PlaceholderText>
                  </MenuItem>
                  <MenuItem value='1'>asset 1</MenuItem>
                  <MenuItem value='2'>asset 2</MenuItem>
                  <MenuItem value='3'>asset 3</MenuItem>
                </SelectInput>
              </FieldWrapper>
            </Grid>

            <Grid item xs={12} sm={6} md={4} xl={2.5}>
              <TextInput
                fullWidth
                name='sim'
                placeholder='SIM No'
                className={styles.TextField}
                value={sim}
                onChange={e => onChangeHandler('sim', e.target.value)}
              />
            </Grid>
            {ability.can('create', 'create-sim-list') && (
              <Grid item>
                <FieldHorizontalWrapper sx={{ gap: 2}}>
                  <ButtonIcon
                    color='success'
                    startIcon={'ic:baseline-plus'}
                    sx={{ width: 100 }}
                    onClick={() => router.push('/catalogs/sim-list/add-or-edit/add')}
                  >
                    Add
                  </ButtonIcon>

                  <Button onClick={handleOpen} sx={{ width: 35, height: 35, minWidth: 35, background: '#00ABBE', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  "&.MuiButtonBase-root:hover":{
                    background: 'none',
                    border: '2px solid #00ABBE',
                  },
                  "&.MuiButtonBase-root:hover svg":{
                    color: '#00ABBE !important'
                  }
                  }}>
                  <Icon icon="material-symbols:cloud-upload" fontSize={22} color='#fff' style={{ flexShrink: 0
                  }} />
                  </Button>

                  <ButtonIcon
                    color='success-outlined'
                    startIcon={'tabler:arrow-narrow-down'}
                    // sx={{ width: 100 }}
                    // onClick={() => router.push('/catalogs/sim-list/add-or-edit/add')}
                  >
                    Download Sample
                  </ButtonIcon>
                </FieldHorizontalWrapper>
              </Grid>
            )}


          </Grid>
        </Grid>
      </Grid>

      <AddFormDialog
        id='sim-Modal'
        title={<Box sx={{display:'flex',  justifyContent:'end'}}>
          <Button sx={{ padding: 0, justifyContent: 'end'}} onClick={handleClose}>
          <Icon icon="akar-icons:cross" color='#000' fontSize={20} fontWeight="600" />
          </Button></Box>}
        close={() => handleClose()}
        open={open}
        submit={() => formik.handleSubmit()}
        bg="#fff"
      >
        <form name='sim-register-form' onSubmit={formik.handleSubmit}>
          <Box>
                  <Box display="flex" flexDirection= "column" alignItems="center">
                  <Image alt={'upload-ic-1'} src="/images/icons/upload-ic.svg" width={100} height={100} />
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', color : '#556485'}}>File Upload</Typography>
                  </Box>

                  <Grid container spacing={4}>
                  <Grid item xs={12}>

                <TextLabel  sx={{ marginBottom: '0.25rem' }}>
                  Excel File
                </TextLabel>

                <Grid item sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                <TextField
                  fullWidth
                  max={10}
                  id='file'
                  name='file'
                  type='text'
                  variant='outlined'
                  className={styles.TextField}
                  sx={{ flex: 1 }}
                  InputProps={{
                    readOnly: true,
                  }}
                  placeholder="Please Select Excel File"
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                />
                <Button
                variant="contained"
                component="label"
                sx={{ background: '#FF8B00', borderRadius:'50px', flex: 0.3, boxShadow: 'none',
                    "&.MuiButtonBase-root:hover":{
                      backgroundColor: '#e57d00'
                    }
              }}
              >
                Browse
                <input
                  type="file"
                  {...formik.getFieldProps('file')}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                  hidden
                />
              </Button>
              </Grid>

            </Grid>

              <Grid item xs={12}>
                <ButtonIcon color="success" sx={{ width: '100%'}} onClick={formik.handleSubmit}>Upload</ButtonIcon>
              </Grid>

            </Grid>
          </Box>
        </form>
      </AddFormDialog>
    </SettingsWrapper>
  )
}

export default SimListingHeader

SimListingHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
