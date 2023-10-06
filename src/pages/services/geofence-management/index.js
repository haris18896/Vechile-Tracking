/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Icon } from '@iconify/react'


import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { styled } from '@mui/material/styles'
import { Autocomplete, Box, DialogTitle, TextField } from '@mui/material'
import GeofenceHeader from 'src/views/services/geofence-management/geofence-header'
import GeofenceTable from 'src/views/services/geofence-management/geofence-table'

// ** ACL Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ServiceWrapper } from 'src/styles/pages/services'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { useCommonStyles } from 'src/styles/common'

const accounts = [
  { id: 1, label: 'Account 1', value: 'account1' },
  { id: 2, label: 'Account 2', value: 'account2' },
  { id: 3, label: 'Account 3', value: 'account3' },
  { id: 4, label: 'Account 4', value: 'account4' }
]

const zones = [
  { id: 1, label: 'Zone 1', value: 'zone1' },
  { id: 2, label: 'Zone 2', value: 'zone2' },
  { id: 3, label: 'Zone 3', value: 'zone3' },
  { id: 4, label: 'Zone 4', value: 'zone4' }
]

function Services() {
  const router = useRouter()
  const dispatch = useDispatch()
  const ability = useContext(AbilityContext)
  const styles = useCommonStyles();

  // ** State
  const [zone, setZone] = useState('')
  const [all, setAll] = useState(false)
  const [search, setSearch] = useState('')
  const [account, setAccount] = useState('')
  const [alert, setAlert] = useState(false)
  const [checkedRows, setCheckedRows] = useState([])
  const [userModal, setUserModal] = useState(false)

  const onChangeHandler = (name, value) => {
    if (name === 'all') setAll(value)
    if (name === 'search') setSearch(value)
    if (name === 'zone') setZone(value?.value)
    if (name === 'account') setAccount(value?.value)
  }

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit, slug }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit, slug }))
  }


  // ALERT HANDLERS
  const handleShowAlert = () => {
    if(checkedRows?.length < 1){
      setAlert(true);
    }
    else{
      setUserModal(true)
    }
  }

  const handleCloseAlert = () => {

    if(checkedRows?.length < 1){
      setAlert(false);
    }
    else{
      setUserModal(false)
    }
  };

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Name of customer type is required'),
    user: Yup.string().required('User is required')
  })

  // ** Formik Values
  const formik = useFormik({
    initialValues: {
      name: '',
      user: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('user', values.user)

        // dispatch(updateAssetTypeAction({ id: idx, data }))
        console.log('values to be submitted : ', values)
        resetForm()
        setAssignUser(false)
      }
    }
  })

  return (
    <ServiceWrapper>
      <GeofenceHeader
        all={all}
        zone={zone}
        zoneOptions={zones}
        router={router}
        search={search}
        account={account}
        ability={ability}
        accountOptions={accounts}
        onChangeHandler={onChangeHandler}
        redirectURL= "/services/geofence-management/edit/add"
        handleShowAlert = {handleShowAlert}
        handleCloseAlert = { handleCloseAlert }
        alert = {alert}
        checkedRows= {checkedRows}
        userModal = {userModal}
      />

      <GeofenceTable

        // rows={rows}
        // page={page}
        // total={total}
        // limit={limit}
        // loading={loading}
        loading={false}
        page={1}
        limit={10}
        total={10}
        router={router}
        ability={ability}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
        checkedRows = {checkedRows}
        setCheckedRows={setCheckedRows}
        userModal = {userModal}
        setUserModal= {setUserModal}

      />

    </ServiceWrapper>
  )
}

Services.acl = {
  action: 'manage',
  subject: 'manage-geofence-management'
}

Services.AuthGuard = true

export default Services
