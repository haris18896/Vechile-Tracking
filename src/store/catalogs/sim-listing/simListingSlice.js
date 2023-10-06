import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllSimListingAction,
  getSimListingByIdAction,
  registerSimListingAction,
  updateSimListingAction,
  deleteSimListingAction
} from './simListingAction'

export const SimListingSlice = createSlice({
  name: 'simListing',
  initialState: {
    loading: false,
    registerSimListing: null,
    getAllSimListingList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getSimListingPending: false,
    updatePending: false,
    getSimListing: null,
    updateSimListing: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All SimListing
      .addCase(getAllSimListingAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllSimListingAction.fulfilled, (state, action) => {
        success(state)
        state.getAllSimListingList.data = action.payload?.data
        state.getAllSimListingList.total = action.payload?.paging?.total
        state.getAllSimListingList.page = action.payload?.paging?.current_page
        state.getAllSimListingList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllSimListingAction.rejected, (state, action) => {
        error(state, action)
        state.getAllSimListingList.data = []
        state.getAllSimListingList.total = 0
      })

      // get SimListing By Id
      .addCase(getSimListingByIdAction.pending, state => {
        state.getSimListingPending = true
      })
      .addCase(getSimListingByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getSimListingPending = false
        state.getSimListing = action.payload
      })
      .addCase(getSimListingByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getSimListingPending = false
        state.getSimListing = null
      })

      // register SimListing
      .addCase(registerSimListingAction.pending, state => {
        state.loading = true
      })
      .addCase(registerSimListingAction.fulfilled, (state, action) => {
        success(state)
        state.registerSimListing = action.payload
      })

      .addCase(registerSimListingAction.rejected, (state, action) => {
        error(state, action)
        state.registerSimListing = null
      })

      // update SimListing
      .addCase(updateSimListingAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateSimListingAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateSimListing = action.payload
      })
      .addCase(updateSimListingAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateSimListing = null
      })

      // delete SimListing
      .addCase(deleteSimListingAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteSimListingAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteSimListingAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default SimListingSlice.reducer
