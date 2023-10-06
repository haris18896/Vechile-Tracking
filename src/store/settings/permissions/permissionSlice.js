import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllPermissionsAction,
  getPermissionByIdAction,
  registerPermissionAction,
  updatePermissionAction,
  deletePermissionAction
} from './permissionsActions'

export const PermissionSlice = createSlice({
  name: 'permission',
  initialState: {
    loading: false,
    registerPermission: null,
    getAllPermissionsList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getPermissionPending: false,
    getPermission: null,
    updatePending: false,
    updatePermission: null,
    deletePermission: null
  },
  reducers: {
    resetPermissions: state => {
      state.getAllPermissionsList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetPermissionById: state => {
      state.getPermission = null
    },
    resetRegisterPermission: state => {
      state.registerPermission = null
    },
    resetUpdatePermission: state => {
      state.updatePermission = null
    }
  },
  extraReducers: builder => {
    builder

      // get All Permissions
      .addCase(getAllPermissionsAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllPermissionsAction.fulfilled, (state, action) => {
        success(state)
        state.getAllPermissionsList.data = action.payload?.data
        state.getAllPermissionsList.total = action.payload?.paging?.total
        state.getAllPermissionsList.page = action.payload?.paging?.current_page
        state.getAllPermissionsList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllPermissionsAction.rejected, (state, action) => {
        error(state, action)
        state.getAllPermissionsList.data = []
        state.getAllPermissionsList.total = 0
      })

      // get Permission By Id
      .addCase(getPermissionByIdAction.pending, state => {
        state.getPermissionPending = true
      })
      .addCase(getPermissionByIdAction.fulfilled, (state, action) => {
        state.error = null
        state.getPermissionPending = false
        state.getPermission = action.payload?.data
      })
      .addCase(getPermissionByIdAction.rejected, (state, action) => {
        state.error = action.payload
        state.getPermissionPending = false
        state.getPermission = null
      })

      // register Permission
      .addCase(registerPermissionAction.pending, state => {
        state.loading = true
      })
      .addCase(registerPermissionAction.fulfilled, (state, action) => {
        success(state)
        state.registerPermission = action.payload
      })

      .addCase(registerPermissionAction.rejected, (state, action) => {
        error(state, action)
        state.registerPermission = null
      })

      // update Permission
      .addCase(updatePermissionAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updatePermissionAction.fulfilled, (state, action) => {
        state.error = null
        state.updatePending = false
        state.updatePermission = action.payload
      })
      .addCase(updatePermissionAction.rejected, (state, action) => {
        state.error = action.payload
        state.updatePending = false
        state.updatePermission = null
      })

      // delete Permission
      .addCase(deletePermissionAction.pending, state => {
        state.loading = true
      })
      .addCase(deletePermissionAction.fulfilled, (state, action) => {
        success(state)
        state.deletePermission = action.payload
      })
      .addCase(deletePermissionAction.rejected, (state, action) => {
        error(state, action)
        state.deletePermission = null
      })
  }
})

export const { resetPermissions, resetGetPermissionById, resetRegisterPermission, resetUpdatePermission } =
  PermissionSlice.actions

export default PermissionSlice.reducer
