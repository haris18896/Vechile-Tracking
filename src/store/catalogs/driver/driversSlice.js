import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllDriversAction,
  getAllWASLDriversAction,
  getDriverByIdAction,
  registerDriverAction,
  registerWASLDriverAction,
  updateDriverAction
} from './driversActions'

export const DriversSlice = createSlice({
  name: 'Drivers',
  initialState: {
    loading: false,
    registerDriver: null,
    registerWASLDriver: null,
    getAllDriversList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getAllWASLDriversList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getDriverPending: false,
    updatePending: false,
    getDriver: null,
    getWASLDriver: null,
    updateDriver: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Drivers
      .addCase(getAllDriversAction.pending, state => {
        state.loading = true
        //reseting driver data when all drivers are get
        state.getDriver = null
      })
      .addCase(getAllDriversAction.fulfilled, (state, action) => {
        success(state)
        state.getAllDriversList.data = action.payload?.data
        state.getAllDriversList.total = action.payload?.paging?.total
        state.getAllDriversList.page = action.payload?.paging?.current_page
        state.getAllDriversList.limit = action.payload?.paging?.per_page
        //reseting driver data when all drivers are get
        state.getDriver = null
      })
      .addCase(getAllDriversAction.rejected, (state, action) => {
        error(state, action)
        state.getAllDriversList.data = []
        state.getAllDriversList.total = 0
        //reseting driver data when all drivers are get
        state.getDriver = null
      })

      // get All wasl Drivers
      .addCase(getAllWASLDriversAction.pending, state => {
        state.loading = true
        //reseting driver data when all drivers are get
        state.getWASLDriver = null
      })
      .addCase(getAllWASLDriversAction.fulfilled, (state, action) => {
        success(state)
        state.getAllWASLDriversList.data = action.payload?.data
        state.getAllWASLDriversList.total = action.payload?.paging?.total
        state.getAllWASLDriversList.page = action.payload?.paging?.current_page
        state.getAllWASLDriversList.limit = action.payload?.paging?.per_page
        //reseting driver data when all drivers are get
        state.getWASLDriver = null
      })
      .addCase(getAllWASLDriversAction.rejected, (state, action) => {
        error(state, action)
        state.getAllWASLDriversList.data = []
        state.getAllWASLDriversList.total = 0
        //reseting driver data when all drivers are get
        state.getWASLDriver = null
      })

      // get Driver By Id
      .addCase(getDriverByIdAction.pending, state => {
        state.getDriverPending = true
      })
      .addCase(getDriverByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getDriverPending = false
        state.getDriver = action.payload
      })
      .addCase(getDriverByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getDriverPending = false
        state.getDriver = null
      })

      // register Driver
      .addCase(registerDriverAction.pending, state => {
        state.loading = true
      })
      .addCase(registerDriverAction.fulfilled, (state, action) => {
        success(state)
        state.registerDriver = action.payload
      })

      .addCase(registerDriverAction.rejected, (state, action) => {
        error(state, action)
        state.registerDriver = null
      })

      // register WASL Driver
      .addCase(registerWASLDriverAction.pending, state => {
        state.loading = true
      })
      .addCase(registerWASLDriverAction.fulfilled, (state, action) => {
        success(state)
        state.registerWASLDriver = action.payload
      })

      .addCase(registerWASLDriverAction.rejected, (state, action) => {
        error(state, action)
        state.registerWASLDriver = null
      })

      // update Driver
      .addCase(updateDriverAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateDriverAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateDriver = action.payload
      })
      .addCase(updateDriverAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateDriver = null
      })
  }
})

export default DriversSlice.reducer
