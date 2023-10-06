import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  deleteRoleAction,
  updateRoleAction,
  registerRoleAction,
  getRoleByIdAction,
  getAllRolesAction
} from './rolesActions'

export const RolesSlice = createSlice({
  name: 'roles',
  initialState: {
    loading: false,
    getRolePending: false,
    registerRole: null,
    getAllRolesList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getRole: null,
    updateRole: null,
    deleteRole: null
  },
  reducers: {
    resetGetAllRoles: state => {
      state.getAllRolesList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetRoleById: state => {
      state.getRole = null
    },
    resetRegisterRole: state => {
      state.registerRole = null
    },
    resetUpdateRole: state => {
      state.updateRole = null
    }
  },
  extraReducers: builder => {
    builder

      // get All Roles
      .addCase(getAllRolesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllRolesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllRolesList.data = action.payload?.data
        state.getAllRolesList.total = action.payload?.paging?.total || 0
        state.getAllRolesList.page = action.payload?.paging?.current_page || 1
        state.getAllRolesList.limit = action.payload?.paging?.per_page || 10
      })
      .addCase(getAllRolesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllRolesList.data = []
        state.getAllRolesList.total = 0
      })

      // get Role By Id
      .addCase(getRoleByIdAction.pending, state => {
        state.getRolePending = true
      })
      .addCase(getRoleByIdAction.fulfilled, (state, action) => {
        state.getRolePending = false
        state.getRole = action.payload
      })
      .addCase(getRoleByIdAction.rejected, (state, action) => {
        state.getRole = null
        state.getRolePending = false
        state.error = action.payload
      })

      // register Role
      .addCase(registerRoleAction.pending, state => {
        state.loading = true
      })
      .addCase(registerRoleAction.fulfilled, (state, action) => {
        success(state)
        state.registerRole = action.payload
      })

      .addCase(registerRoleAction.rejected, (state, action) => {
        error(state, action)
        state.registerRole = null
      })

      // update Role
      .addCase(updateRoleAction.pending, state => {
        state.loading = true
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        success(state)
        state.updateRole = action.payload
      })
      .addCase(updateRoleAction.rejected, (state, action) => {
        error(state, action)
        state.updateRole = null
      })

      // delete Role
      .addCase(deleteRoleAction.pending, state => {
        state.loading = true
      })
      .addCase(deleteRoleAction.fulfilled, (state, action) => {
        success(state)
        state.deleteRole = action.payload
      })
      .addCase(deleteRoleAction.rejected, (state, action) => {
        error(state, action)
        state.deleteRole = null
      })
  }
})

export const { resetGetAllRoles, resetGetRoleById, resetRegisterRole, resetUpdateRole } = RolesSlice.actions

export default RolesSlice.reducer
