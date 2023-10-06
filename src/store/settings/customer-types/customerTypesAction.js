import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Customers list
export const getAllCustomersTypesAction = createAsyncThunk(
  'customerTypes/getAllCustomerTypes',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCustomerTypes(page, limit)
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

// get Customer by id
export const getCustomerTypeByIdAction = createAsyncThunk(
  'customerTypes/getCustomerTypeById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getCustomerTypeById(id)
      const resData = res.data
      toast.success('Customer type fetched successfully')

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Customer
export const registerCustomerTypeAction = createAsyncThunk(
  'customerTypes/registerCustomerType',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerCustomerType(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Customer Type registered successfully')
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

// update Customer
export const updateCustomerTypeAction = createAsyncThunk(
  'customerTypes/updateCustomerType',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateCustomerType(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success(`Customer type updated successfully`)
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

export const deleteCustomerTypeAction = createAsyncThunk(
  'customerTypes/deleteCustomerType',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteCustomerType(id)
      if (res.status === 204) {
        toast.success('Customer type deleted successfully')
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
  'customerTypes/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllCustomersTypesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('customerTypes/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllCustomersTypesAction({ page, limit }))
})
