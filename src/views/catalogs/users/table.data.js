import React, { useState } from 'react'
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'

// ** utils
import useJwt from 'src/auth/jwt/useJwt'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** store & actions
import { useDispatch, useSelector } from 'react-redux'
import { getUserByIdAction, updateUserAction } from 'src/store/catalogs/users/usersActions'
import { getAllPermissionsAction } from 'src/store/settings/permissions/permissionsActions'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Styled Component
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { PlaceholderText, useCommonStyles } from 'src/styles/common'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

var idx = null

export const columns = ({ ability }) => {
  const dispatch = useDispatch()
  const { getUser } = useSelector(state => state.users)
  const [showPassword, setShowPassword] = useState(false)
  const { getAllCustomersList } = useSelector(state => state.customers)

  const customersList = getAllCustomersList?.data

  const styles = useCommonStyles()

  // ** Total Permissions
  const totalPermissions = useJwt.getData('totalPermissions')

  // ** Modal Stats
  const [updateOpen, setUpdateOpen] = useState(false)
  const [permissionValues, setPermissionValues] = useState([])

  // ** Handle adding permissions to array
  const handleChange = event => {
    setPermissionValues(event.target.value)
  }

  // ** Handle Modal
  const handleUpdateOpen = id => {
    idx = id
    setUpdateOpen(true)
    dispatch(getUserByIdAction(id))
    dispatch(getAllPermissionsAction({ page: 1, limit: totalPermissions }))
  }

  const handleUpdateClose = () => {
    setUpdateOpen(false)
  }

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is a required field'),
    permissions: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().required()
      })
    )
  })

  // ** Formik Values
  const formik = useFormik({
    initialValues: {
      name: getUser?.data?.name,
      email: getUser?.data?.email,
      role: '',
      customer_id: '',
      password: '',
      c_password: ''

      // name: getUser?.data?.name || '',
      // permissions: getUser?.data?.roles[0]?.permissions || []
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          permissions: permissionValues

          // permissions: values.permissions.map(permission => permission.id)
        }
        dispatch(updateUserAction({ id: idx, data }))
        resetForm()
        handleUpdateClose()
      }
    }
  })

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  let rolesList = [
    {
      id: 0,
      name: 'Select'
    },
    {
      id: 1,
      name: 'Role 1'
    },
    ,
    {
      id: 2,
      name: 'Role 2'
    }
  ]

  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    idx = id
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  return [
    {
      name: 'Name',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Email',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.email}
        </Typography>
      )
    },
    {
      name: 'Created At',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.created_at.split('T')[0]}
        </Typography>
      ),
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    },
    {
      name: 'Status',
      sortable: false,
      cell: row => (
        <CustomChip
          size='small'
          label='Active'
          color='success'
          skin='light'
          sx={{
            padding: '0.4rem 0.5rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}

          // color={row?.status === 'Active' ? 'success' : 'error'}
          //   label={row.status}
        />
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', 'update-user') && (
              <CustomChip
                onClick={() => handleUpdateOpen(row.id)}
                size='small'
                label={
                  <Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
                }
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem'
                }}
              />
            )}

            {ability.can('delete', 'delete-user') && (
              <CustomChip
                onClick={() => handleDeleteOpen(row.id)}
                size='small'
                skin='light'
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem',
                  marginLeft: '0.5rem'
                }}
              />
            )}

            <AlertDialog
              IconWd='35'
              IconHt='35'
              open={deleteOpen}
              iconColor='#FC3B61'
              id='delete-Modal'
              icon='tabler:bell-ringing'
              close={() => handleDeleteClose()}
              submit={() =>
                console.log('dispatch(deleteCustomerAction({id: idx, callBack: () => handleDeleteClose()}))')
              }
              context='Are you sure you want to delete this User?'
            />

            <AddFormDialog
              id='update-Modal'
              title='Update User'
              context='Enter new details for the user and click update'
              close={() => handleUpdateClose()}
              open={updateOpen}
              submit={() => formik.handleSubmit()}
              agree='Update'
              bg='#fff'
              cancel='Cancel'
            >
              <form name='add-user' onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                        Name
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='name'
                        name='name'
                        type='text'
                        variant='outlined'
                        placeholder='Enter User Name'
                        {...formik.getFieldProps('name')}
                        inputProps={{
                          onKeyPress: handleKeyPress // add onKeyPress event handler
                        }}
                        className={styles.TextField}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='email' sx={{ marginBottom: '0.25rem' }}>
                        Email
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='email'
                        name='email'
                        type='email'
                        variant='outlined'
                        placeholder='Enter User Email'
                        {...formik.getFieldProps('email')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={styles.TextField}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextLabel id='customer' sx={{ marginBottom: '0.25rem' }}>
                      Customer
                    </TextLabel>
                    <Select
                      fullWidth
                      defaultValue={formik.values.customer_id}
                      placeholder='Select Customer...'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      {...formik.getFieldProps('customer_id')}
                      className={styles.Select}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='outlined'
                          placeholder='Select Asset'
                          error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                          helperText={formik.touched.customer_id && formik.errors.customer_id}
                        />
                      )}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: formik.touched.customer_id && formik.errors.customer_id && '#E53E3E !important'
                        }
                      }}
                    >
                      {customersList?.map((customer, index) =>
                        index === 0 ? (
                          <MenuItem key={index} value=''>
                            <PlaceholderText>Customer ID</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={index} value={`${customer.id}`}>
                            {customer.company_name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    {formik.touched.customer_id && Boolean(formik.errors.customer_id) && (
                      <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                        {formik.touched.customer_id && formik.errors.customer_id}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='role' sx={{ marginBottom: '0.25rem' }}>
                        Role
                      </TextLabel>
                      <Select
                        fullWidth
                        defaultValue={formik.values.role}
                        {...formik.getFieldProps('role')}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        className={styles.Select}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: formik.touched.role && formik.errors.role && '#E53E3E !important'
                          }
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant='outlined'
                            placeholder='Select Role'
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                          />
                        )}
                      >
                        {rolesList.map((role, index) =>
                          index === 0 ? (
                            <MenuItem key={index} value=''>
                              <PlaceholderText>Select Role</PlaceholderText>
                            </MenuItem>
                          ) : (
                            <MenuItem key={index} value={role.name}>
                              {role.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      {formik.touched.role && Boolean(formik.errors.role) && (
                        <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                          {formik.touched.role && formik.errors.role}
                        </FormHelperText>
                      )}
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='password' sx={{ marginBottom: '0.25rem' }}>
                        Password
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        variant='outlined'
                        placeholder='*********'
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        {...formik.getFieldProps('password')}
                        className={styles.TextField}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='confirm-password' sx={{ marginBottom: '0.25rem' }}>
                        Confirm Password
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='c_password'
                        name='c_password'
                        type='password'
                        variant='outlined'
                        placeholder='*********'
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        {...formik.getFieldProps('c_password')}
                        className={styles.TextField}
                        error={formik.touched.c_password && Boolean(formik.errors.c_password)}
                        helperText={formik.touched.c_password && formik.errors.c_password}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </form>
            </AddFormDialog>
          </div>
        )
      }
    }
  ]
}
