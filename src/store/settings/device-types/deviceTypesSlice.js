import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllDeviceTypesAction,
  getDeviceTypeByIdAction,
  registerDeviceTypeAction,
  updateDeviceTypeAction
} from './deviceTypesAction'

export const DeviceTypesSlice = createSlice({
  name: 'deviceTypes',
  initialState: {
    loading: false,
    getAllDeviceTypesList: {
      data: [],
      page: 1,
      total: 0,
      limit: 10
    },
    registerDeviceType: null,
    getDeviceType: null,
    updateDeviceType: null,
    error: null
  },
  reducers: {
    resetGetAllDeviceTypes: state => {
      state.getAllDeviceTypesList = {
        data: [],
        page: 1,
        limit: 10,
        total: 0
      }
    },
    resetGetDeviceTypeById: state => {
      state.getDeviceType = null
    },
    resetRegisterDeviceType: state => {
      state.registerDeviceType = null
    },
    resetUpdateDeviceType: state => {
      state.updateDeviceType = null
    }
  },
  extraReducers: builder => {
    builder

      // get All device Types
      .addCase(getAllDeviceTypesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllDeviceTypesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllDeviceTypesList.data = action.payload?.data
        state.getAllDeviceTypesList.total = action.payload?.paging?.total || 0
        state.getAllDeviceTypesList.page = action.payload?.paging?.current_page || 1
        state.getAllDeviceTypesList.limit = action.payload?.paging?.per_page || 10
      })
      .addCase(getAllDeviceTypesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllDeviceTypesList.data = []
        state.getAllDeviceTypesList.total = 0
      })

      // get device Types By Id
      .addCase(getDeviceTypeByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getDeviceTypeByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getDeviceType = action.payload?.data
      })
      .addCase(getDeviceTypeByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getDeviceType = null
      })

      // register device Types
      .addCase(registerDeviceTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(registerDeviceTypeAction.fulfilled, (state, action) => {
        success(state)
        state.registerDeviceType = action.payload
      })

      .addCase(registerDeviceTypeAction.rejected, (state, action) => {
        error(state, action)
        state.registerDeviceType = null
      })

      // update device Types
      .addCase(updateDeviceTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(updateDeviceTypeAction.fulfilled, (state, action) => {
        success(state)
        state.updateDeviceType = action.payload
      })
      .addCase(updateDeviceTypeAction.rejected, (state, action) => {
        error(state, action)
        state.updateDeviceType = null
      })
  }
})

export const { resetGetAllDeviceTypes, resetGetDeviceTypeById, resetRegisterDeviceType, resetUpdateDeviceType } =
  DeviceTypesSlice.actions

export default DeviceTypesSlice.reducer
