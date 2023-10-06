import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllGroupAction,
  getGroupByIdAction,
  registerGroupAction,
  updateGroupAction,
  deleteGroupAction
} from './groupAction'

export const GroupSlice = createSlice({
  name: 'group',
  initialState: {
    loading: false,
    registerGroup: null,
    getAllGroupList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getGroupPending: false,
    updatePending: false,
    getGroup: null,
    updateGroup: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Group
      .addCase(getAllGroupAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllGroupAction.fulfilled, (state, action) => {
        success(state)
        state.getAllGroupList.data = action.payload?.data
        state.getAllGroupList.total = action.payload?.paging?.total
        state.getAllGroupList.page = action.payload?.paging?.current_page
        state.getAllGroupList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllGroupAction.rejected, (state, action) => {
        error(state, action)
        state.getAllGroupList.data = []
        state.getAllGroupList.total = 0
      })

      // get Group By Id
      .addCase(getGroupByIdAction.pending, state => {
        state.getGroupPending = true
      })
      .addCase(getGroupByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getGroupPending = false
        state.getGroup = action.payload
      })
      .addCase(getGroupByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getGroupPending = false
        state.getGroup = null
      })

      // register Group
      .addCase(registerGroupAction.pending, state => {
        state.loading = true
      })
      .addCase(registerGroupAction.fulfilled, (state, action) => {
        success(state)
        state.registerGroup = action.payload
      })

      .addCase(registerGroupAction.rejected, (state, action) => {
        error(state, action)
        state.registerGroup = null
      })

      // update Group
      .addCase(updateGroupAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateGroupAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateGroup = action.payload
      })
      .addCase(updateGroupAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateGroup = null
      })

      // delete Group
      .addCase(deleteGroupAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteGroupAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteGroupAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default GroupSlice.reducer
