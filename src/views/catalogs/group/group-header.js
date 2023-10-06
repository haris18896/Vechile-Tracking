import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

function GroupHeader({ slug, onChangeHandler, router, ability }) {
  const common = useCommonStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({})

  // ** Form Values
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

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

  const accountOptions = [
    { id: '1', label: 'Account 1' },
    { id: '2', label: 'Account 2' }
  ]

  return (
    <SettingsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Title>Device List</Title>
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
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
            {ability.can('create', 'create-group') && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <FieldHorizontalWrapper>
                  <ButtonIcon
                    color='success'
                    startIcon={'ic:baseline-plus'}
                    onClick={() => router.push('/catalogs/group/edit/add')}
                  >
                    Add
                  </ButtonIcon>
                </FieldHorizontalWrapper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </SettingsWrapper>
  )
}

export default GroupHeader

GroupHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
