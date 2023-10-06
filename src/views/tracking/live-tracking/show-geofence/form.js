/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Custom Components
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { HeaderLabel } from 'src/styles/components/input'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** Contexts
import { TableUIContext } from 'src/contexts/TableContext'
import { SettingsWrapper } from 'src/styles/pages/settings'

// ** Redux Action and Slice
import { useDispatch, useSelector } from 'react-redux'
import { getAllZoneAction } from 'src/store/catalogs/zone/zoneActions'
import { getAllGeofenceListAction } from 'src/store/tracking/geofence/geofenceAction'

function ShowGeofenceForm(props) {
  const { formik } = props

  // ** Router
  const router = useRouter()

  // ** Styles
  const styles = useCustomStyles()

  // ** Dipsatch
  const dispatch = useDispatch()

  // ** Getting Table Context and Passing Header Refrence
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  // ** Getting Data From Redux

  // ** Zones List
  const { getAllZoneList } = useSelector(state => state.zone)

  const zoneList = getAllZoneList.data?.map(list => {
    return {
      value: list.id,
      label: list.name
    }
  })

  // ** Geofence Limit
  const { limit } = useSelector(state => state.geofence.getAllGeofenceList)

  // ** Fecthing Data

  // ** Zone -->
  useEffect(() => {
    dispatch(getAllZoneAction({ page: 1, limit: 'all' }))
  }, [router])

  // ** Geofence List Fltering
  useEffect(() => {
    dispatch(
      getAllGeofenceListAction({
        page: 1,
        limit: limit,
        zone: formik.values?.zone,
        name: formik.values?.name,
        header: true
      })
    )
  }, [formik.values?.zone, formik.values.name])

  return (
    <form onSubmit={formik.handleSubmit}>
      <SettingsWrapper swipe={true} ref={headerRef}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} mt='64px' pl='1.25rem' pr='1.5rem'>
          <Grid item xs={12}>
            <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>Geofence List</HeaderLabel>
          </Grid>
          <Grid item xs={12} marginTop={{ xs: '10px', sm: '15px', md: '25px' }}>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>Zone</TextLabel>
                <Autocomplete
                  fullWidth
                  id='zone'
                  name='zone'
                  options={zoneList}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('zone', e.target.value)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.zone && formik.errors.zone && '#E53E3E !important'
                    }
                  }}
                  value={zoneList?.find(zone => zone.label === formik.values.zone)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Zone'
                      error={formik.touched.zone && Boolean(formik.errors.zone)}
                      helperText={formik.touched.zone && formik.errors.zone}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>Search</TextLabel>
                <TextInput
                  fullWidth
                  max={10}
                  id='name'
                  name='name'
                  type='text'
                  variant='outlined'
                  placeholder='Search Geofence'
                  className={styles.TextField}
                  {...formik.getFieldProps('name')}
                  error={formik.touched.search && Boolean(formik.errors.search)}
                  helperText={formik.touched.search && formik.errors.search}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </SettingsWrapper>
    </form>
  )
}

export default ShowGeofenceForm
