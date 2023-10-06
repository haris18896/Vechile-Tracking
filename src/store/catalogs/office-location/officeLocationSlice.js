import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllOfficeLocationsAction,
  getOfficeLocationByIdAction,
  registerOfficeLocationAction,
  updateOfficeLocationAction
} from './officeLocationActions'

export const OfficeLocationsSlice = createSlice({
  name: 'OfficeLocations',
  initialState: {
    loading: false,
    registerOfficeLocation: null,
    getAllOfficeLocationsList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getOfficeLocationPending: false,
    updatePending: false,
    getOfficeLocation: null,
    updateOfficeLocation: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All OfficeLocations
      .addCase(getAllOfficeLocationsAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllOfficeLocationsAction.fulfilled, (state, action) => {
        success(state)
        state.getAllOfficeLocationsList.data = action.payload?.data?.data
        state.getAllOfficeLocationsList.total = action.payload?.data?.total
        state.getAllOfficeLocationsList.page = action.payload?.data?.current_page
        state.getAllOfficeLocationsList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllOfficeLocationsAction.rejected, (state, action) => {
        error(state, action)
        state.getAllOfficeLocationsList.data = []
        state.getAllOfficeLocationsList.total = 0
      })

      // get OfficeLocation By Id
      .addCase(getOfficeLocationByIdAction.pending, state => {
        state.getOfficeLocationPending = true
      })
      .addCase(getOfficeLocationByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getOfficeLocationPending = false
        state.getOfficeLocation = action.payload
      })
      .addCase(getOfficeLocationByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getOfficeLocationPending = false
        state.getOfficeLocation = null
      })

      // register OfficeLocation
      .addCase(registerOfficeLocationAction.pending, state => {
        state.loading = true
      })
      .addCase(registerOfficeLocationAction.fulfilled, (state, action) => {
        success(state)
        state.registerOfficeLocation = action.payload
      })

      .addCase(registerOfficeLocationAction.rejected, (state, action) => {
        error(state, action)
        state.registerOfficeLocation = null
      })

      // update OfficeLocation
      .addCase(updateOfficeLocationAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateOfficeLocationAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateOfficeLocation = action.payload
      })
      .addCase(updateOfficeLocationAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateOfficeLocation = null
      })
  }
})

export default OfficeLocationsSlice.reducer
