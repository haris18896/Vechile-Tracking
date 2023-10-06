import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllFuelCalibrationAction,
  getFuelCalibrationByIdAction,
  registerFuelCalibrationAction,
  updateFuelCalibrationAction,
  deleteFuelCalibrationAction
} from './fuelCalibrationAction'

export const FuelCalibrationSlice = createSlice({
  name: 'fuelCalibration',
  initialState: {
    loading: false,
    registerFuelCalibration: null,
    getAllFuelCalibrationList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getFuelCalibrationPending: false,
    updatePending: false,
    getFuelCalibration: null,
    updateFuelCalibration: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All FuelCalibration
      .addCase(getAllFuelCalibrationAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllFuelCalibrationAction.fulfilled, (state, action) => {
        success(state)
        state.getAllFuelCalibrationList.data = action.payload?.data?.data
        state.getAllFuelCalibrationList.total = action.payload?.data?.total
        state.getAllFuelCalibrationList.page = action.payload?.data?.current_page
        state.getAllFuelCalibrationList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllFuelCalibrationAction.rejected, (state, action) => {
        error(state, action)
        state.getAllFuelCalibrationList.data = []
        state.getAllFuelCalibrationList.total = 0
      })

      // get FuelCalibration By Id
      .addCase(getFuelCalibrationByIdAction.pending, state => {
        state.getFuelCalibrationPending = true
      })
      .addCase(getFuelCalibrationByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getFuelCalibrationPending = false
        state.getFuelCalibration = action.payload
      })
      .addCase(getFuelCalibrationByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getFuelCalibrationPending = false
        state.getFuelCalibration = null
      })

      // register FuelCalibration
      .addCase(registerFuelCalibrationAction.pending, state => {
        state.loading = true
      })
      .addCase(registerFuelCalibrationAction.fulfilled, (state, action) => {
        success(state)
        state.registerFuelCalibration = action.payload
      })

      .addCase(registerFuelCalibrationAction.rejected, (state, action) => {
        error(state, action)
        state.registerFuelCalibration = null
      })

      // update FuelCalibration
      .addCase(updateFuelCalibrationAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateFuelCalibrationAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateFuelCalibration = action.payload
      })
      .addCase(updateFuelCalibrationAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateFuelCalibration = null
      })

      // delete FuelCalibration
      .addCase(deleteFuelCalibrationAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteFuelCalibrationAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteFuelCalibrationAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default FuelCalibrationSlice.reducer
