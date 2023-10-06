import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'
import { getNull } from 'src/utilities/utils'

// ** Dashboard Asset List Action, Limit and Action
export const getAllAssetListAction = createAsyncThunk(
  'tracking/getAllAseetList',
  async ({ page, limit, name }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDashboardAssetList(page, limit, name)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fethcing Asset List')

      return rejectWithValue(err?.message)
    }
  }
)

export const handleLimitAssetListAction = createAsyncThunk(
  'tracking /handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllAssetListAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAssetListAction = createAsyncThunk(
  'tracking/handlePage',
  async ({ page, limit }, { dispatch }) => {
    dispatch(getAllAssetListAction({ page, limit }))
  }
)

// ** Dashboard Asset Count Action
export const getAllAssetCountAction = createAsyncThunk('tracking/getAllAssetCount', async ({}, { rejectWithValue }) => {
  try {
    const res = await useJwt.getAllDashboardAssetCount()
    console.log(res.data, 'res')
    const resData = res?.data

    return resData
  } catch (err) {
    toast.error('Error While Asset Count')

    return rejectWithValue(err?.message)
  }
})

// ** Detailed Tracking Action
export const getAllDetailedTrackingActions = createAsyncThunk(
  'tracking/getAllDetailedTracking',
  async ({ page, limit, asset_id, driver_id, imei }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDetailedTracking(page, limit, asset_id, driver_id, imei)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Tracking Details')

      return rejectWithValue(err?.message)
    }
  }
)

export const handleLimitDetailTrackingAction = createAsyncThunk(
  'tracking /handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllDetailedTrackingActions({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageDetailTrackingAction = createAsyncThunk(
  'tracking/handlePage',
  async ({ page, limit }, { dispatch }) => {
    dispatch(getAllDetailedTrackingActions({ page, limit }))
  }
)

// ** History Tracking
export const getHistoryTrackingAction = createAsyncThunk('tracking/getHistory', async (data, { rejectWithValue }) => {
  try {
    const res = await useJwt.getHistoryTracking(data)
    const resData = res?.data

    return resData
  } catch (err) {
    toast.error('Error While Asset Count')

    return rejectWithValue(err?.message)
  }
})

// ** Getting Status Counts for Live tracking Table
export const getStatusCountsTracking = createAsyncThunk(
  'tracking/statusCounts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDashboardAssetList(page, limit)
      const resData = res?.data

      const statusCounts = {
        'powered off': 0,
        idling: 0,
        moving: 0,
        'ignition off': 0,
        'no data available': 0,
        all: 0
      }

      const updatedStautsCounts = resData?.data.reduce(
        (count, item) => {
          if (!getNull(item?.status) && count.hasOwnProperty(item.status?.toLowerCase())) {
            count[item.status?.toLowerCase()]++
          }

          count.all++

          return count
        },
        { ...statusCounts }
      )

      return updatedStautsCounts
    } catch (err) {
      toast.error('Error While Fetching Asset Count')

      return rejectWithValue(err?.message)
    }
  }
)
