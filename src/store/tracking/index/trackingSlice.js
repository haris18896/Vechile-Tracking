import { createSlice } from '@reduxjs/toolkit'
import { error, success } from '../../utils'
import {
  getAllAssetCountAction,
  getAllAssetListAction,
  getAllDetailedTrackingActions,
  getHistoryTrackingAction,
  getStatusCountsTracking
} from './trackingAction'

// ** initial state for slice
const initialState = {
  loading: false,
  assetCountLoading: false,
  error: null,
  getStatusCounts: {
    data: [],
    loading: false,
    error: null
  },
  getAllAssetList: {
    data: [],
    limit: 10,
    page: 1,
    total: 0
  },
  getHistoryTracking: {
    data: [],
    paging: {}
  },
  getAllAssetCount: null,
  getDetailedTracking: {
    data: [],
    error: null,
    loading: false,
    limit: 10,
    total: 0,
    page: 1
  }
}

export const trackingSlice = createSlice({
  name: 'trackingSlice',
  initialState: initialState,
  reducers: {
    // Reset AssetList on unmount or else
    resetAssetList: state => {
      state.getAllAssetList = {
        data: [],
        limit: 10,
        page: 1,
        total: 0
      }
      state.getHistoryTracking = {
        data: [],
        paging: {}
      }
      state.error = null
      state.loading = false
    },

    resetDetailedTracking: state => {
      state.getDetailedTracking = {
        data: {},
        error: null,
        loading: false,
        limit: 10,
        total: 0,
        page: 1
      }
    },

    resetStautsCounts: state => {
      state.getStatusCounts = {
        data: [],
        loading: false,
        error: null
      }
    },
    resetHistoryTracking: state => {
      state.getHistoryTracking = {
        data: [],
        paging: {}
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** Get Asset List Action
      .addCase(getAllAssetListAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllAssetListAction.fulfilled, (state, action) => {
        success(state, action)
        state.getAllAssetList.data = action.payload?.data
        state.getAllAssetList.page = action.payload?.paging.current_page
        state.getAllAssetList.limit = action.payload?.paging.per_page
        state.getAllAssetList.total = action.payload?.paging.total
      })
      .addCase(getAllAssetListAction.rejected, (state, action) => {
        error(state, action)
      })

      // ** Get Asset Count Action
      .addCase(getAllAssetCountAction.pending, state => {
        state.assetCountLoading = true
      })
      .addCase(getAllAssetCountAction.fulfilled, (state, action) => {
        state.assetCountLoading = false
        state.getAllAssetCount = action.payload?.data
      })
      .addCase(getAllAssetCountAction.rejected, (state, action) => {
        error(state, action)
      })

      // ** Get History Action
      .addCase(getHistoryTrackingAction.pending, state => {
        state.loading = true
      })
      .addCase(getHistoryTrackingAction.fulfilled, (state, action) => {
        success(state, action)
        state.getHistoryTracking.data = action.payload?.data
        state.getHistoryTracking.paging = action.payload?.paging
      })
      .addCase(getHistoryTrackingAction.rejected, (state, action) => {
        state.loading = false
        error(state, action)
      })

      // ** Get Detailed Tracking Action
      .addCase(getAllDetailedTrackingActions.pending, state => {
        state.getDetailedTracking.loading = true
      })
      .addCase(getAllDetailedTrackingActions.fulfilled, (state, action) => {
        state.getDetailedTracking.loading = false
        state.getDetailedTracking.data = action.payload?.data
        state.getDetailedTracking.limit = action.payload?.paging.per_page
        state.getDetailedTracking.total = action.payload?.paging.total
        state.getDetailedTracking.page = action.payload?.paging.current_page
      })
      .addCase(getAllDetailedTrackingActions.rejected, (state, action) => {
        state.getDetailedTracking.loading = false
        state.getDetailedTracking.error = action.payload
      })

      // ** Get Status  Counts For Asset List Tracking
      .addCase(getStatusCountsTracking.pending, state => {
        state.getStatusCounts.loading = true
      })
      .addCase(getStatusCountsTracking.fulfilled, (state, action) => {
        state.getStatusCounts.loading = false
        state.getStatusCounts.data = action.payload
      })
      .addCase(getStatusCountsTracking.rejected, (state, action) => {
        state.getStatusCounts.loading = false
        state.getStatusCounts.error = action.payload
      })
  }
})

export const { resetAssetList, resetDetailedTracking, resetHistoryTracking, resetStautsCounts } = trackingSlice.actions

export default trackingSlice.reducer
