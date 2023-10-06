import { createSlice } from '@reduxjs/toolkit'
import { error, success } from '../../utils'
import { getAllTrackDataActions } from './trackingReportAction'

// ** initial state for slice
const initialState = {
  getAllTrackData: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    loading: false,
    error: null
  }
}

export const trackReportSlice = createSlice({
  name: 'trackReport',
  initialState: initialState,
  reducers: {
    // Reset trackData on unmount or else
    resetTrackData: state => {
      state.getAllTrackData = {
        data: [],
        limit: 10,
        page: 1,
        total: 0,
        loading: false,
        error: null
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** Get Asset List Action
      .addCase(getAllTrackDataActions.pending, state => {
        state.getAllTrackData.loading = true
      })
      .addCase(getAllTrackDataActions.fulfilled, (state, action) => {
        state.getAllTrackData.loading = false
        state.getAllTrackData.data = action.payload?.data
        state.getAllTrackData.page = action.payload?.paging.current_page
        state.getAllTrackData.limit = action.payload?.paging.per_page
        state.getAllTrackData.total = action.payload?.paging.total
      })
      .addCase(getAllTrackDataActions.rejected, (state, action) => {
        state.getAllTrackData.error = action.payload
        state.getAllTrackData.loading = false
      })
  }
})

export const { resetTrackData } = trackReportSlice.actions

export default trackReportSlice.reducer
