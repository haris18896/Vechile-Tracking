import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All FuelCalibration list
export const getAllFuelCalibrationAction = createAsyncThunk(
  'fuelCalibration/getAllFuelCalibration',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllFuelCalibration(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching FuelCalibration List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get FuelCalibration by id
export const getFuelCalibrationByIdAction = createAsyncThunk(
  'fuelCalibration/getFuelCalibrationById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getFuelCalibrationById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register FuelCalibration
export const registerFuelCalibrationAction = createAsyncThunk(
  'fuelCalibration/registerFuelCalibration',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerFuelCalibration(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('FuelCalibration registered successfully')
        dispatch(getAllFuelCalibrationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update FuelCalibration
export const updateFuelCalibrationAction = createAsyncThunk(
  'fuelCalibration/updateFuelCalibration',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateFuelCalibration(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllFuelCalibrationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteFuelCalibrationAction = createAsyncThunk(
  'fuelCalibration/deleteFuelCalibration',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteFuelCalibration(id)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllFuelCalibrationAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'fuelCalibration/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllFuelCalibrationAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk(
  'fuelCalibration/handlePage',
  async ({ page, limit }, { dispatch }) => {
    dispatch(getAllFuelCalibrationAction({ page, limit }))
  }
)
