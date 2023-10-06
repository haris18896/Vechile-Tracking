import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Profiles list
export const getAllProfilesAction = createAsyncThunk(
  'profile/getAllProfiles',
  async ({ page, limit, customer_id, is_super_admin }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllProfiles(page, limit, customer_id, is_super_admin)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Profiles List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Profile by id
export const getProfileByIdAction = createAsyncThunk(
  'profile/getProfileById',
  async ({ id, customer_id }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getProfileById(id, customer_id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Profile
export const registerProfileAction = createAsyncThunk(
  'profile/registerProfile',
  async ({ data, callBack }, { rejectWithValue }) => {
    try {
      const res = await useJwt.registerProfile(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Profile registered successfully')
        callBack()
      }

      return resData
    } catch (err) {
      console.log('error', err?.response?.data.message)
      const error = err?.response?.data?.data
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Profile
export const updateProfileAction = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, data, callBack }, { rejectWithValue }) => {
    try {
      const res = await useJwt.updateProfile(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
      }

      callBack()

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'profile/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllProfilesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('profile/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllProfilesAction({ page, limit }))
})
