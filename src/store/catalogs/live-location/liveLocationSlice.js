import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllLiveLocationAction,
  getLiveLocationByIdAction,
  registerLiveLocationAction,
  updateLiveLocationAction,
  deleteLiveLocationAction
} from './liveLocationAction'

export const LiveLocationSlice = createSlice({
  name: 'liveLocation',
  initialState: {
    loading: false,
    registerLiveLocation: null,
    getAllLiveLocationList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getLiveLocationPending: false,
    updatePending: false,
    getLiveLocation: null,
    updateLiveLocation: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All LiveLocation
      .addCase(getAllLiveLocationAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllLiveLocationAction.fulfilled, (state, action) => {
        success(state)
        state.getAllLiveLocationList.data = action.payload?.data?.data
        state.getAllLiveLocationList.total = action.payload?.data?.total
        state.getAllLiveLocationList.page = action.payload?.data?.current_page
        state.getAllLiveLocationList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllLiveLocationAction.rejected, (state, action) => {
        error(state, action)
        state.getAllLiveLocationList.data = []
        state.getAllLiveLocationList.total = 0
      })

      // get LiveLocation By Id
      .addCase(getLiveLocationByIdAction.pending, state => {
        state.getLiveLocationPending = true
      })
      .addCase(getLiveLocationByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getLiveLocationPending = false
        state.getLiveLocation = action.payload
      })
      .addCase(getLiveLocationByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getLiveLocationPending = false
        state.getLiveLocation = null
      })

      // register LiveLocation
      .addCase(registerLiveLocationAction.pending, state => {
        state.loading = true
      })
      .addCase(registerLiveLocationAction.fulfilled, (state, action) => {
        success(state)
        state.registerLiveLocation = action.payload
      })

      .addCase(registerLiveLocationAction.rejected, (state, action) => {
        error(state, action)
        state.registerLiveLocation = null
      })

      // update LiveLocation
      .addCase(updateLiveLocationAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateLiveLocationAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateLiveLocation = action.payload
      })
      .addCase(updateLiveLocationAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateLiveLocation = null
      })

      // delete LiveLocation
      .addCase(deleteLiveLocationAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteLiveLocationAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteLiveLocationAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default LiveLocationSlice.reducer
