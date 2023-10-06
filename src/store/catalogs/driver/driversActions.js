import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Drivers list
export const getAllDriversAction = createAsyncThunk(
  'driver/getAllDrivers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDrivers(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Drivers List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

//Get All wasl drivers list
export const getAllWASLDriversAction = createAsyncThunk(
  'driver/getAllWASLDrivers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllWASLDrivers(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Drivers List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Driver by id
export const getDriverByIdAction = createAsyncThunk(
  'driver/getDriverById',
  async ({ id, callback }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getDriverById(id)
      const resData = res.data
      callback()

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Driver
export const registerDriverAction = createAsyncThunk(
  'driver/registerDriver',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerDriver(data)
      const resData = res.data
      if (resData) {
        toast.success('Driver registered successfully')
        callback()
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message?.type || err?.response?.data.message || err.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Driver
export const registerWASLDriverAction = createAsyncThunk(
  'driver/registerWASLDriver',
  async ({ data, callback }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerWASLDriver(data)
      const resData = res.data
      if (resData) {
        toast.success('Driver registered successfully')
        dispatch(getAllWASLDriversAction({ page: 1, limit: 10 }))
        callback()
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message?.type || err?.response?.data.message || err.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Driver
export const updateDriverAction = createAsyncThunk(
  'driver/updateDriver',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateDriver(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllDriversAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update wasl Driver
export const updateWaslDriverAction = createAsyncThunk(
  'driver/updateWaslDriver',
  async ({ id, data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateWaslDriver(id, data)
      const resData = res.data
      callBack()
      toast.success(`Updated`)
      dispatch(getAllWASLDriversAction({ page: 1, limit: 10 }))

      return resData
    } catch (err) {
      let msg = err?.response?.data?.message || err?.message?.type || err?.message?.description || err?.message
      // toast.error(msg ? msg : 'ERROR')

      return rejectWithValue(msg)
    }
  }
)

// delete wasl Driver
export const deleteWaslDriverAction = createAsyncThunk(
  'driver/updateDriver',
  async ({ id, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deletWaslDriver(id)
      const resData = res.data
      callBack()
      toast.success(`Deleted`)
      dispatch(getAllWASLDriversAction({ page: 1, limit: 10 }))

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'driver/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllDriversAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('driver/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllDriversAction({ page, limit }))
})

export const handleWASLLimitAction = createAsyncThunk(
  'driver/handleWASLLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllWASLDriversAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handleWASLPageAction = createAsyncThunk('driver/handleWASLPage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllWASLDriversAction({ page, limit }))
})
