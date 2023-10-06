import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// ** Get All Device Types list
export const getAllDeviceTypesAction = createAsyncThunk(
  'deviceTypes/getAllDevicesTypes',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDevicesTypes(page, limit)
      const resData = res.data

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// ** get Device Type by id
export const getDeviceTypeByIdAction = createAsyncThunk(
  'deviceTypes/getDeviceTypeById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getDeviceTypeById(id)
      const resData = res.data
      toast.success('Device type fetched successfully')

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// ** register Device Type
export const registerDeviceTypeAction = createAsyncThunk(
  'deviceTypes/registerDeviceType',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerDeviceType(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Device type registered successfully')
        callback()
      }

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// ** update Device Type
export const updateDeviceTypeAction = createAsyncThunk(
  'deviceTypes/updateDeviceType',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateDeviceType(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success(`${resData?.message}`)
        callback()
      }

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteDeviceTypeAction = createAsyncThunk(
  'deviceTypes/deleteDeviceType',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteDeviceType(id)
      toast.success('Roles deleted successfully')

      if (res.status === 204) {
        callback()
      }

      return fulfillWithValue(res)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'deviceTypes/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllDeviceTypesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('deviceTypes/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllDeviceTypesAction({ page, limit }))
})
