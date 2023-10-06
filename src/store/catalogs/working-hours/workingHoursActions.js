import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Office Locations list
export const getAllWorkingHoursAction = createAsyncThunk(
  'WorkingHours/getAllWorkingHours',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllWorkingHours(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching WorkingHours List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Office Location by id
export const getWorkingHoursByIdAction = createAsyncThunk(
  'WorkingHours/getWorkingHoursById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getWorkingHoursById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Office Location
export const registerWorkingHoursAction = createAsyncThunk(
  'WorkingHours/registerWorkingHours',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerWorkingHours(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('WorkingHours registered successfully')
        dispatch(getAllWorkingHoursAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Office Location
export const updateWorkingHoursAction = createAsyncThunk(
  'WorkingHours/updateWorkingHours',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateWorkingHours(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllWorkingHoursAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'WorkingHours/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllWorkingHoursAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('WorkingHours/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllWorkingHoursAction({ page, limit }))
})
