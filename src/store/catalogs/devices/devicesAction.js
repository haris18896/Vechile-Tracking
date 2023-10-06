import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// ** Get All Devices
export const getAllDevicesAction = createAsyncThunk(
  'devices/getAllDevices',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDevices(page, limit)
      const resData = res.data

      // toast.success('Devices List Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Devices..')

      return rejectWithValue(err?.response?.data.message?.type || err?.response?.data.message?.type || err.message)
    }
  }
)

// ** Approve Devices
export const approveDevicesAction = createAsyncThunk(
  'devices/getAllDevices',
  async ({ device_id, page, limit }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.approveDevice(device_id)
      const resData = res.data
      toast.success('Devices Approved Successfully')
      dispatch(getAllDevicesAction({ page: page, limit: limit }))

      return resData
    } catch (err) {
      toast.error('Unable To approve Device..')
      dispatch(getAllDevicesAction({ page: page, limit: limit }))

      return rejectWithValue(err?.response?.data.message?.type || err?.response?.data.message?.type || err.message)
    }
  }
)

// ** Get All UnAllocated Devices
export const getAllUnAllocatedDevicesAction = createAsyncThunk(
  'devices/getAllUnAllocatedDevices',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllUnAllocatedDevices(page, limit)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error while fetching Unallocated Devices')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const registerDeviceAction = createAsyncThunk(
  'devices/registerDevice',
  async ({ data, callback }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerDevice(data)
      const resData = res.data
      toast.success('Device Added Successfully')
      callback()
      dispatch(getAllDevicesAction({ page: 1, limit: 10 }))

      return fulfillWithValue(resData)
    } catch (err) {
      toast.error('Error While Adding Device..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteDeviceAction = createAsyncThunk(
  'devices/deleteDevice',
  async ({ id }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteDevice(id)
      const resData = res.data
      toast.success('Device delete Successfully')
      dispatch(getAllDevicesAction({ page: 1, limit: 10 }))

      return fulfillWithValue(resData)
    } catch (err) {
      toast.error('Error While Adding Device..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'devices/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllDevicesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('devices/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllDevicesAction({ page, limit }))
})
