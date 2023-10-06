import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Campuses list
export const getAllCampusesAction = createAsyncThunk(
  'campus/getAllCampuses',
  async ({ page, limit, customer_id }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCampuses(page, limit, customer_id)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Campuses List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Campus by id
export const getCampusByIdAction = createAsyncThunk(
  'campus/getCampusById',
  async ({ id, customer_id }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getCampusById(id, customer_id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Campus
export const registerCampusAction = createAsyncThunk(
  'campus/registerCampus',
  async ({ data, callBack }, { rejectWithValue }) => {
    try {
      const res = await useJwt.registerCampus(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Campus registered successfully')
        callBack()
      }

      return resData
    } catch (err) {
      console.log('error', err?.response?.data.message)
      const error = err?.response?.data?.data
      toast.error(err?.response?.data?.message)

      // if (error?.city_id) {
      //   toast.error(error?.city_id)
      // }

      // if (error?.state_id) {
      //   toast.error(error?.state_id)
      // }

      // toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Campus
export const updateCampusAction = createAsyncThunk(
  'campus/updateCampus',
  async ({ id, data, callBack }, { rejectWithValue }) => {
    try {
      const res = await useJwt.updateCampus(id, data)
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
  'campus/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllCampusesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('campus/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllCampusesAction({ page, limit }))
})
