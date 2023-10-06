import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Office Locations list
export const getAllOfficeLocationsAction = createAsyncThunk(
  'OfficeLocation/getAllOfficeLocations',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllOfficeLocations(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching OfficeLocations List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Office Location by id
export const getOfficeLocationByIdAction = createAsyncThunk(
  'OfficeLocation/getOfficeLocationById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getOfficeLocationById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Office Location
export const registerOfficeLocationAction = createAsyncThunk(
  'officeLocation/registerOfficeLocation',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerOfficeLocation(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('OfficeLocation registered successfully')
        dispatch(getAllOfficeLocationsAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Office Location
export const updateOfficeLocationAction = createAsyncThunk(
  'officeLocation/updateOfficeLocation',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateOfficeLocation(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllOfficeLocationsAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'officeLocation/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllOfficeLocationsAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('officeLocation/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllOfficeLocationsAction({ page, limit }))
})
