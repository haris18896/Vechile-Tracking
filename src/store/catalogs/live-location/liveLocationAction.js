import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All LiveLocation list
export const getAllLiveLocationAction = createAsyncThunk(
  'liveLocation/getAllLiveLocation',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllLiveLocation(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Live Locations List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get LiveLocation by id
export const getLiveLocationByIdAction = createAsyncThunk(
  'liveLocation/getLiveLocationById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getLiveLocationById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register LiveLocation
export const registerLiveLocationAction = createAsyncThunk(
  'liveLocation/registerLiveLocation',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerLiveLocation(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Live Location registered successfully')
        dispatch(getAllLiveLocationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update LiveLocation
export const updateLiveLocationAction = createAsyncThunk(
  'liveLocation/updateLiveLocation',
  async ({ id, data, slug }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateLiveLocation(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllLiveLocationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteLiveLocationAction = createAsyncThunk(
  'liveLocation/deleteLiveLocation',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteLiveLocation(id)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllLiveLocationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'liveLocation/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllLiveLocationAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('liveLocation/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllLiveLocationAction({ page, limit }))
})
