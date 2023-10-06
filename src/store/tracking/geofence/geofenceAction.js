import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'

// ** Geofence Limit and Action
export const getAllGeofenceListAction = createAsyncThunk(
  'Geofence/getAllGeofenceList',
  async ({ page, limit, zone, name, header }, { rejectWithValue }) => {
    try {
      console.log(zone, name, 'action')
      const res = await useJwt.getAllGeofenceList(page, limit, zone, name)
      const resData = res?.data
      if (resData && !header) {
        toast.success('Geofence Fetched Successfully')
      }

      return resData
    } catch (err) {
      toast.error('Error While Fetching Geofence List')

      return rejectWithValue(err?.message)
    }
  }
)

export const handleLimitGeofenceListAction = createAsyncThunk(
  'geofenceList/handleLimit',
  async ({ new_limit, old_limit }, { dispatch }) => {
    if (old_limit !== new_limit) {
      dispatch(getAllGeofenceListAction({ page: 1, limit: new_limit }))
    }
  }
)

export const handlePageGeofenceListAction = createAsyncThunk(
  'geofenceList/handlePage',
  async ({ page, limit }, { dispatch }) => {
    dispatch(getAllGeofenceListAction({ page, limit }))
  }
)

// ** Register Gefence -->
export const registerGeofenceAction = createAsyncThunk('gefence/registerGeofenceList', async ({ data, callback }) => {
  try {
    const res = await useJwt.registerGeofenceList(data)
    const resData = res?.data
    if (resData) {
      toast.success('Geofence Registerd Successfully')
      callback()
    }

    return resData
  } catch (err) {
    toast.error('Error While Registering Geofence')

    return rejectWithValue(err?.message)
  }
})

// ** Geofence Types
export const getAllGeofenceTypeAction = createAsyncThunk(
  'geofenceType/getAllGeofenceTypeList',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllGeofenceTypesList(page, limit)
      const resData = res?.data
      // if (resData) {
      //   toast.success('Geofence Types Fetched Successfully')
      // }

      return resData
    } catch (err) {
      toast.error('Error While Fetching Geofence List')

      return rejectWithValue(err?.message)
    }
  }
)
