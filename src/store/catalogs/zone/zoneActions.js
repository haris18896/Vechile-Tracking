import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Zone list
export const getAllZoneAction = createAsyncThunk(
  'zone/getAllZone',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllZone(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Zone List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Zone by id
export const getZoneByIdAction = createAsyncThunk('zone/getZoneById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getZoneById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register Zone
export const registerZoneAction = createAsyncThunk(
  'zone/registerZone',
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerZone(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Zone registered successfully')
        dispatch(getAllZoneAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Zone
export const updateZoneAction = createAsyncThunk(
  'zone/updateZone',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateZone(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllZoneAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteZoneAction = createAsyncThunk('zone/deleteZone', async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await useJwt.deleteZone(id)
    const resData = res.data
    if (resData?.success) {
      toast.success(`${resData?.message}`)
      dispatch(getAllZoneAction({ page: 1, limit: 10 }))
    }

    return resData
  } catch (err) {
    toast.error(err?.response?.data?.message)

    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

export const handleLimitAction = createAsyncThunk('zone/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllZoneAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('zone/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllZoneAction({ page, limit }))
})
