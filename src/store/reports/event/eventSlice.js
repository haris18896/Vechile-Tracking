import { createSlice } from '@reduxjs/toolkit'
import { getAllEventReportAction } from './eventAction'

// ** initial state for slice
const initialState = {
  getAllEventData: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    loading: false,
    error: null
  }
}

export const EventReportSlice = createSlice({
  name: 'eventReport',
  initialState: initialState,
  reducers: {
    // Reset trackData on unmount or else
    resetEventReport: state => {
      state.getAllEventData = {
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
      .addCase(getAllEventReportAction.pending, state => {
        state.getAllEventData.loading = true
      })
      .addCase(getAllEventReportAction.fulfilled, (state, action) => {
        state.getAllEventData.loading = false
        state.getAllEventData.data = action.payload?.data
        // state.getAllEventData.page = action.payload?.paging.current_page
        // state.getAllEventData.limit = action.payload?.paging.per_page
        // state.getAllEventData.total = action.payload?.paging.total
      })
      .addCase(getAllEventReportAction.rejected, (state, action) => {
        state.getAllEventData.error = action.payload
        state.getAllEventData.loading = false
      })
  }
})

export const { resetEventReport } = EventReportSlice.actions

export default EventReportSlice.reducer
