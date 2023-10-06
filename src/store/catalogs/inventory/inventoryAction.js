import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Inventory list
export const getAllInventoryAction = createAsyncThunk(
  'inventory/getAllInventory',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllInventory(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Inventory List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Inventory by id
export const getInventoryByIdAction = createAsyncThunk(
  'inventory/getInventoryById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getInventoryById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register Inventory
export const registerInventoryAction = createAsyncThunk(
  'inventory/registerInventory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerInventory(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Inventory registered successfully')
        dispatch(getAllInventoryAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Inventory
export const updateInventoryAction = createAsyncThunk(
  'inventory/updateInventory',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateInventory(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllInventoryAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteInventoryAction = createAsyncThunk(
  'inventory/deleteInventory',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteInventory(id)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllInventoryAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'inventory/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllInventoryAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk(
  'inventory/handlePage',
  async ({ page, limit }, { dispatch }) => {
    dispatch(getAllInventoryAction({ page, limit }))
  }
)
