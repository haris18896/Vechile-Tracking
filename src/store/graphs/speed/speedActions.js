import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

//get all speed data
export const getAllSpeedGraphAction = createAsyncThunk('tracking/getHistory', async (data, { rejectWithValue }) => {
  try {
    const res = await useJwt.getSpeedGraph(data)
    const resData = res?.data

    return resData
  } catch (err) {
    toast.error('Error While Asset Count')

    return rejectWithValue(err?.message)
  }
})

// Get All Customers list
export const getAllAccountsAction = createAsyncThunk(
  'Account/getAllAccounts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCustomers(page, limit)
      const resData = res.data

      // toast.success('Customers List Fetched Successfully')
      useJwt.setData('totalAccounts', resData?.data?.total)

      return resData
    } catch (err) {
      toast.error('Error While Fetching Accounts...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Customer by id
export const getAccountByIdAction = createAsyncThunk('Accounts/getAccountById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getCustomerById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register Customer
export const registerCustomerAction = createAsyncThunk(
  'Customers/registerCustomer',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerCustomer(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Customer registered successfully')
        dispatch(getAllCustomersAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Customer
export const updateCustomerAction = createAsyncThunk(
  'Customers/updateCustomer',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateCustomer(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllCustomersAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error('Error While Updating Customer...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk('roles/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllCustomersAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('roles/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllCustomersAction({ page, limit }))
})
