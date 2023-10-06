import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAlertsAction, } from './alertActions'

export const AlertSlice = createSlice({
  name: 'alert',
  initialState: {
    loading: false,
    getAlertsList: {
      data: [],
      page: 1,
      limit: 10
    },
  },
  reducers: {
    resetAlerts: state => {
      state.getAlertsList = {
        data: [],
        page: 1,
        limit: 10
      }
    },
  },
  extraReducers: builder => {
    builder

      // get All asset
      .addCase(getAlertsAction.pending, state => {
        state.loading = true
      })
      .addCase(getAlertsAction.fulfilled, (state, action) => {
        success(state)
        state.getAlertsList.data = action.payload?.data
        state.getAlertsList.page = action.payload?.paging?.current_page || 1
        state.getAlertsList.limit = action.payload?.paging?.per_page || 10
        state.getAlertsList.total = action.payload?.paging?.total
      })
      .addCase(getAlertsAction.rejected, (state, action) => {
        error(state, action)
        state.getAlertsList.data = []
        state.getAlertsList.total = 0
      })

  }
})

export const { resetAlerts } = AlertSlice.actions

export default AlertSlice.reducer
