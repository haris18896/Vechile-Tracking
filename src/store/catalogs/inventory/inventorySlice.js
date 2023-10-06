import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllInventoryAction,
  getInventoryByIdAction,
  registerInventoryAction,
  updateInventoryAction,
  deleteInventoryAction
} from './inventoryAction'

export const InventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    loading: false,
    registerInventory: null,
    getAllInventoryList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getInventoryPending: false,
    updatePending: false,
    getInventory: null,
    updateInventory: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Inventory
      .addCase(getAllInventoryAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllInventoryAction.fulfilled, (state, action) => {
        success(state)
        state.getAllInventoryList.data = action.payload?.data?.data
        state.getAllInventoryList.total = action.payload?.data?.total
        state.getAllInventoryList.page = action.payload?.data?.current_page
        state.getAllInventoryList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllInventoryAction.rejected, (state, action) => {
        error(state, action)
        state.getAllInventoryList.data = []
        state.getAllInventoryList.total = 0
      })

      // get Inventory By Id
      .addCase(getInventoryByIdAction.pending, state => {
        state.getInventoryPending = true
      })
      .addCase(getInventoryByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getInventoryPending = false
        state.getInventory = action.payload
      })
      .addCase(getInventoryByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getInventoryPending = false
        state.getInventory = null
      })

      // register Inventory
      .addCase(registerInventoryAction.pending, state => {
        state.loading = true
      })
      .addCase(registerInventoryAction.fulfilled, (state, action) => {
        success(state)
        state.registerInventory = action.payload
      })

      .addCase(registerInventoryAction.rejected, (state, action) => {
        error(state, action)
        state.registerInventory = null
      })

      // update Inventory
      .addCase(updateInventoryAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateInventoryAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateInventory = action.payload
      })
      .addCase(updateInventoryAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateInventory = null
      })

      // delete Inventory
      .addCase(deleteInventoryAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteInventoryAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteInventoryAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default InventorySlice.reducer
