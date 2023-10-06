import { createSlice } from '@reduxjs/toolkit'
import { getAllFleetSummaryActions } from './fleetReportAction'

// ** initial state for slice
const initialState = {
  getAllFleetData: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    loading: false,
    error: null
  }
}

export const FleetReportSlice = createSlice({
  name: 'fleetReport',
  initialState: initialState,
  reducers: {
    // Reset trackData on unmount or else
    resetFleetData: state => {
      state.getAllFleetData = {
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
      .addCase(getAllFleetSummaryActions.pending, state => {
        state.getAllFleetData.loading = true
      })
      .addCase(getAllFleetSummaryActions.fulfilled, (state, action) => {
        state.getAllFleetData.loading = false
        state.getAllFleetData.data = action.payload?.data
        state.getAllFleetData.page = action.payload?.paging.current_page
        state.getAllFleetData.limit = action.payload?.paging.per_page
        state.getAllFleetData.total = action.payload?.paging.total
      })
      .addCase(getAllFleetSummaryActions.rejected, (state, action) => {
        state.getAllFleetData.error = action.payload
        state.getAllFleetData.loading = false
      })
  }
})

export const { resetTrackData } = FleetReportSlice.actions

export default FleetReportSlice.reducer
