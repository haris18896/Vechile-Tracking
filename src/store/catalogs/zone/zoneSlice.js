import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllZoneAction,
  getZoneByIdAction,
  registerZoneAction,
  updateZoneAction,
  deleteZoneAction
} from './zoneActions'

export const ZoneSlice = createSlice({
  name: 'zone',
  initialState: {
    loading: false,
    registerZone: null,
    getAllZoneList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getZonePending: false,
    updatePending: false,
    getZone: null,
    updateZone: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Zone
      .addCase(getAllZoneAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllZoneAction.fulfilled, (state, action) => {
        success(state)
        state.getAllZoneList.data = action.payload?.data
        state.getAllZoneList.total = action.payload?.paging?.total
        state.getAllZoneList.page = action.payload?.paging?.current_page
        state.getAllZoneList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllZoneAction.rejected, (state, action) => {
        error(state, action)
        state.getAllZoneList.data = []
        state.getAllZoneList.total = 0
      })

      // get Zone By Id
      .addCase(getZoneByIdAction.pending, state => {
        state.getZonePending = true
      })
      .addCase(getZoneByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getZonePending = false
        state.getZone = action.payload
      })
      .addCase(getZoneByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getZonePending = false
        state.getZone = null
      })

      // register Zone
      .addCase(registerZoneAction.pending, state => {
        state.loading = true
      })
      .addCase(registerZoneAction.fulfilled, (state, action) => {
        success(state)
        state.registerZone = action.payload
      })

      .addCase(registerZoneAction.rejected, (state, action) => {
        error(state, action)
        state.registerZone = null
      })

      // update Zone
      .addCase(updateZoneAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateZoneAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateZone = action.payload
      })
      .addCase(updateZoneAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateZone = null
      })

      // delete Zone
      .addCase(deleteZoneAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteZoneAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteZoneAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default ZoneSlice.reducer
