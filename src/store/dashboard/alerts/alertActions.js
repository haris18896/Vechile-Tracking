import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// ** Get All list
export const getAlertsAction = createAsyncThunk('alert/getAlerts', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const res = await useJwt.getAllAlerts(page, limit)
    const resData = res.data
    // toast.success('Assets List Fetched Successfully')

    return resData
  } catch (err) {
    // toast.error('Error While Fetching Assets..')

    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

//dismiss alerts
export const postAlertsAction = createAsyncThunk(
  'alert/postAlerts',
  async ({ id, data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.postAlerts(id, data)
      const resData = res.data
      toast.success('Assets List Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Assets..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'alerts/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAlertsAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('alerts/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAlertsAction({ page, limit }))
})
