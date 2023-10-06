import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllWarehouseAction,
  getWarehouseByIdAction,
  registerWarehouseAction,
  updateWarehouseAction,
  deleteWarehouseAction
} from './warehouseAction'

export const WarehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    loading: false,
    registerWarehouse: null,
    getAllWarehouseList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getWarehousePending: false,
    updatePending: false,
    getWarehouse: null,
    updateWarehouse: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Warehouse
      .addCase(getAllWarehouseAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllWarehouseAction.fulfilled, (state, action) => {
        success(state)
        state.getAllWarehouseList.data = action.payload?.data?.data
        state.getAllWarehouseList.total = action.payload?.data?.total
        state.getAllWarehouseList.page = action.payload?.data?.current_page
        state.getAllWarehouseList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllWarehouseAction.rejected, (state, action) => {
        error(state, action)
        state.getAllWarehouseList.data = []
        state.getAllWarehouseList.total = 0
      })

      // get Warehouse By Id
      .addCase(getWarehouseByIdAction.pending, state => {
        state.getWarehousePending = true
      })
      .addCase(getWarehouseByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getWarehousePending = false
        state.getWarehouse = action.payload
      })
      .addCase(getWarehouseByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getWarehousePending = false
        state.getWarehouse = null
      })

      // register Warehouse
      .addCase(registerWarehouseAction.pending, state => {
        state.loading = true
      })
      .addCase(registerWarehouseAction.fulfilled, (state, action) => {
        success(state)
        state.registerWarehouse = action.payload
      })

      .addCase(registerWarehouseAction.rejected, (state, action) => {
        error(state, action)
        state.registerWarehouse = null
      })

      // update Warehouse
      .addCase(updateWarehouseAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateWarehouseAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateWarehouse = action.payload
      })
      .addCase(updateWarehouseAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateWarehouse = null
      })

      // delete Warehouse
      .addCase(deleteWarehouseAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteWarehouseAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteWarehouseAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default WarehouseSlice.reducer
