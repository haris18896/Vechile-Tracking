import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllDevicesAction, getAllUnAllocatedDevicesAction, registerDeviceAction } from './devicesAction'

export const DevicesSlice = createSlice({
  name: 'devices',
  initialState: {
    loading: false,
    unAllocatedLoading: false,
    getAllDevicesList: {
      data: [],
      page: 1,
      limit: 10
    },
    getAllUnAllocatedDevicesList: {
      data: [],
      page: 1,
      limit: 10
    },
    registerDevice: null
  },
  reducers: {
    resetDevices: state => {
      state.getAllDevicesList = {
        data: [],
        page: 1,
        limit: 10
      }
    },
    resetDevices: state => {
      state.getAllUnAllocatedDevicesList = {
        data: [],
        page: 1,
        limit: 10
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** get All devices
      .addCase(getAllDevicesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllDevicesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllDevicesList.data = action.payload?.data
        state.getAllDevicesList.page = action.payload?.paging?.current_page || 1
        state.getAllDevicesList.limit = action.payload?.paging?.per_page || 10
        state.getAllDevicesList.total = action.payload?.paging?.total
      })
      .addCase(getAllDevicesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllDevicesList.data = []
        state.getAllDevicesList.total = 0
      })

      // ** get All devices
      .addCase(getAllUnAllocatedDevicesAction.pending, state => {
        state.unAllocatedLoading = true
      })
      .addCase(getAllUnAllocatedDevicesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllUnAllocatedDevicesList.data = action.payload?.data
        state.getAllUnAllocatedDevicesList.page = action.payload?.paging?.current_page || 1
        state.getAllUnAllocatedDevicesList.limit = action.payload?.paging?.per_page || 10
        state.getAllUnAllocatedDevicesList.total = action.payload?.paging?.total
      })
      .addCase(getAllUnAllocatedDevicesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllUnAllocatedDevicesList.data = []
        state.getAllUnAllocatedDevicesList.total = 0
      })

      // ** Register Device
      .addCase(registerDeviceAction.pending, state => {
        state.loading = true
      })
      .addCase(registerDeviceAction.fulfilled, (state, action) => {
        success(state)
        state.registerDevice = action.payload
      })
      .addCase(registerDeviceAction.rejected, (state, action) => {
        error(state, action)
        state.registerDevice = null
      })
  }
})

export const { resetDevices } = DevicesSlice.actions

export default DevicesSlice.reducer
