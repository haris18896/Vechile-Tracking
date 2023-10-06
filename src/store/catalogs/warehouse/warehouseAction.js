import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Warehouse list
export const getAllWarehouseAction = createAsyncThunk(
  'warehouse/getAllWarehouse',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllWarehouse(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Warehouse List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Warehouse by id
export const getWarehouseByIdAction = createAsyncThunk('warehouse/getWarehouseById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getWarehouseById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register Warehouse
export const registerWarehouseAction = createAsyncThunk(
  'warehouse/registerWarehouse',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerWarehouse(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Warehouse registered successfully')
        dispatch(getAllWarehouseAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Warehouse
export const updateWarehouseAction = createAsyncThunk(
  'warehouse/updateWarehouse',
  async ({ id, data, slug }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateWarehouse(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllWarehouseAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteWarehouseAction = createAsyncThunk('warehouse/deleteWarehouse', async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await useJwt.deleteWarehouse(id)
    const resData = res.data
    if (resData?.success) {
      toast.success(`${resData?.message}`)
      dispatch(getAllWarehouseAction({ page: 1, limit: 10 }))
    }

    return resData
  } catch (err) {
    toast.error(err?.response?.data?.message)

    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

export const handleLimitAction = createAsyncThunk('warehouse/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllWarehouseAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('warehouse/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllWarehouseAction({ page, limit }))
})
