import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllProfileTypesAction,
  getProfileTypeByIdAction,
  registerProfileTypeAction,
  updateProfileTypeAction
} from './profileTypesAction'

export const ProfileTypesSlice = createSlice({
  name: 'profileTypes',
  initialState: {
    loading: false,
    getAllProfileTypesList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    registerProfileType: null,
    getProfileType: null,
    updateProfileType: null
  },
  reducers: {
    resetGetAllProfileTypes: state => {
      state.getAllProfileTypesList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetProfileTypeById: state => {
      state.getProfileType = null
    },
    resetRegisterProfileType: state => {
      state.registerProfileType = null
    },
    resetUpdateProfileType: state => {
      state.updateProfileType = null
    }
  },
  extraReducers: builder => {
    builder

      // get All ProfileTypes
      .addCase(getAllProfileTypesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllProfileTypesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllProfileTypesList.data = action.payload?.data
        state.getAllProfileTypesList.total = action.payload?.paging?.total || 0
        state.getAllProfileTypesList.page = action.payload?.paging?.current_page || 1
        state.getAllProfileTypesList.limit = action.payload?.paging?.per_page || 10
      })
      .addCase(getAllProfileTypesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllProfileTypesList.data = []
        state.getAllProfileTypesList.total = 0
      })

      // get ProfileTypes By Id
      .addCase(getProfileTypeByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getProfileTypeByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getProfileType = action.payload
      })
      .addCase(getProfileTypeByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getProfileType = null
      })

      // register ProfileTypes
      .addCase(registerProfileTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(registerProfileTypeAction.fulfilled, (state, action) => {
        success(state)
        state.registerProfileType = action.payload
      })

      .addCase(registerProfileTypeAction.rejected, (state, action) => {
        error(state, action)
        state.registerProfileType = null
      })

      // update ProfileTypes
      .addCase(updateProfileTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(updateProfileTypeAction.fulfilled, (state, action) => {
        success(state)
        state.updateProfileType = action.payload
      })
      .addCase(updateProfileTypeAction.rejected, (state, action) => {
        error(state, action)
        state.updateProfileType = null
      })
  }
})

export const { resetGetAllProfileTypes, resetGetProfileTypeById, resetRegisterProfileType, resetUpdateProfileType } =
  ProfileTypesSlice.actions

export default ProfileTypesSlice.reducer
