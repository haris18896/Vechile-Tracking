import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All resellers list
export const getAllResellerAction = createAsyncThunk(
  'reseller/getAllReseller',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { page, limit } = payload
      const res = await useJwt.getAllReseller(page, limit)
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

// get reseller by id
export const getResellerByIdAction = createAsyncThunk(
  'reseller/getResellerById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getResellerById(id)
      const resData = res.data
      toast.success('Reseller fetched successfully')

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register reseller
export const registerResellerAction = createAsyncThunk(
  'reseller/registerReseller',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerReseller(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Reseller registered successfully')
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

// update reseller
export const updateResellerAction = createAsyncThunk(
  'reseller/updateReseller',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateReseller(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Reseller updated successfully')
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

// delete reseller
export const deleteResellerAction = createAsyncThunk(
  'reseller/deleteReseller',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteReseller(id)
      const resData = res.data
      if (res.status === 204) {
        toast.success('Reseller deleted successfully')
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

export const handleLimitAction = createAsyncThunk(
  'reseller/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllResellerAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('reseller/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllResellerAction({ page, limit }))
})
