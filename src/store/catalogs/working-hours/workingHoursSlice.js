import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllWorkingHoursAction,
  getWorkingHoursByIdAction,
  registerWorkingHoursAction,
  updateWorkingHoursAction
} from './workingHoursActions'

export const WorkingHoursSlice = createSlice({
  name: 'WorkingHours',
  initialState: {
    loading: false,
    registerWorkingHours: null,
    getAllWorkingHoursList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getWorkingHoursPending: false,
    updatePending: false,
    getWorkingHours: null,
    updateWorkingHours: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All WorkingHours
      .addCase(getAllWorkingHoursAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllWorkingHoursAction.fulfilled, (state, action) => {
        success(state)
        state.getAllWorkingHoursList.data = action.payload?.data?.data
        state.getAllWorkingHoursList.total = action.payload?.data?.total
        state.getAllWorkingHoursList.page = action.payload?.data?.current_page
        state.getAllWorkingHoursList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllWorkingHoursAction.rejected, (state, action) => {
        error(state, action)
        state.getAllWorkingHoursList.data = []
        state.getAllWorkingHoursList.total = 0
      })

      // get WorkingHours By Id
      .addCase(getWorkingHoursByIdAction.pending, state => {
        state.getWorkingHoursPending = true
      })
      .addCase(getWorkingHoursByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getWorkingHoursPending = false
        state.getWorkingHours = action.payload
      })
      .addCase(getWorkingHoursByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getWorkingHoursPending = false
        state.getWorkingHours = null
      })

      // register WorkingHours
      .addCase(registerWorkingHoursAction.pending, state => {
        state.loading = true
      })
      .addCase(registerWorkingHoursAction.fulfilled, (state, action) => {
        success(state)
        state.registerWorkingHours = action.payload
      })

      .addCase(registerWorkingHoursAction.rejected, (state, action) => {
        error(state, action)
        state.registerWorkingHours = null
      })

      // update WorkingHours
      .addCase(updateWorkingHoursAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateWorkingHoursAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateWorkingHours = action.payload
      })
      .addCase(updateWorkingHoursAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateWorkingHours = null
      })
  }
})

export default WorkingHoursSlice.reducer
