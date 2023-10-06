import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All ProfileTypes list
export const getAllProfileTypesAction = createAsyncThunk(
  'profileTypes/getAllProfileTypes',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllProfileTypes(page, limit)
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

// get ProfileTypes by id
export const getProfileTypeByIdAction = createAsyncThunk(
  'profileTypes/getProfileTypeById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getProfileTypeById(id)
      const resData = res.data

      if (res?.status === 200) {
        toast.success('Profile type fetched successfully')
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

// register ProfileTypes
export const registerProfileTypeAction = createAsyncThunk(
  'profileTypes/registerProfileType',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerProfileType(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('ProfileTypes registered successfully')
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

// update ProfileTypes
export const updateProfileTypeAction = createAsyncThunk(
  'profileTypes/updateProfileType',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateProfileType(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success(`ProfileTypes updated successfully`)
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

export const deleteProfileTypeAction = createAsyncThunk(
  'profileTypes/deleteProfileTypes',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteProfileType(id)
      toast.success('Profile type deleted successfully')
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
  'profileTypes/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllProfileTypesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('profileTypes/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllProfileTypesAction({ page, limit }))
})
