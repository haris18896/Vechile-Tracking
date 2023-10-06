import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  deleteUserAction,
  updateUserAction,
  registerUserAction,
  getUserByIdAction,
  getAllUsersAction
} from './usersActions'

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    registerUser: null,
    getAllUsersList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getUserPending: false,
    updatePending: false,
    getUser: null,
    updateUser: null,
    deleteUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Users
      .addCase(getAllUsersAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        success(state)
        state.getAllUsersList.data = action.payload?.data
        state.getAllUsersList.total = action.payload?.paging?.total
        state.getAllUsersList.page = action.payload?.paging?.current_page
        state.getAllUsersList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        error(state, action)
        state.getAllUsersList.data = []
        state.getAllUsersList.total = 0
      })

      // get User By Id
      .addCase(getUserByIdAction.pending, state => {
        state.getUserPending = true
      })
      .addCase(getUserByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getUserPending = false
        state.getUser = action.payload
      })
      .addCase(getUserByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getUserPending = false
        state.getUser = null
      })

      // register User
      .addCase(registerUserAction.pending, state => {
        state.loading = true
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        success(state)
        state.registerUser = action.payload
      })

      .addCase(registerUserAction.rejected, (state, action) => {
        error(state, action)
        state.registerUser = null
      })

      // update User
      .addCase(updateUserAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateUser = action.payload
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateUser = null
      })

      // delete User
      .addCase(deleteUserAction.pending, state => {
        state.loading = true
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        success(state)
        state.deleteUser = action.payload
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        error(state, action)
        state.deleteUser = null
      })
  }
})

export default UsersSlice.reducer
