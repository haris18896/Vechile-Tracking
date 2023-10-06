import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All SimListing list
export const getAllSimListingAction = createAsyncThunk(
  'simListing/getAllSimListing',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllSimListing(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching SimListing List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get SimListing by id
export const getSimListingByIdAction = createAsyncThunk(
  'simListing/getSimListingById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getSimListingById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register SimListing
export const registerSimListingAction = createAsyncThunk(
  'simListing/registerSimListing',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    console.log(data, 'data')
    try {
      const res = await useJwt.registerSimListing(data)

      const resData = res.data
      if (resData?.success) {
        toast.success('SimListing registered successfully')
        callback()
        dispatch(getAllSimListingAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      console.error(err, 'err')
      toast.error(err?.response?.data?.message?.type || err?.response?.data.message || err.message)

      return rejectWithValue(err?.response?.data?.message?.type || err?.response?.data.message || err.message)
    }
  }
)

// update SimListing
export const updateSimListingAction = createAsyncThunk(
  'simListing/updateSimListing',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateSimListing(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllSimListingAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteSimListingAction = createAsyncThunk(
  'simListing/deleteSimListing',
  async ({ id, callback }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteSimListing(id)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllSimListingAction({ page: 1, limit: 10 }))
      }
      callback()

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'simListing/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllSimListingAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('simListing/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllSimListingAction({ page, limit }))
})
