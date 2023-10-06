import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Customers list
export const getAllCustomersAction = createAsyncThunk(
  'Customer/getAllCustomers',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCustomers(page, limit)
      const resData = res.data
      useJwt.setData('totalCustomers', resData?.data?.total)

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description?.subdomain) {
        toast.error(err?.response?.data?.message?.description?.subdomain)
      } else toast.error(err.messages)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// Get All wasl Customers list
export const getAllWASLCustomersAction = createAsyncThunk(
  'Customers/getAllWASLCustomers',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllWASLCustomers(page, limit)
      const resData = res.data
      useJwt.setData('totalCustomers', resData?.data?.total)

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description?.subdomain) {
        toast.error(err?.response?.data?.message?.description?.subdomain)
      } else toast.error(err.messages)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const SwitchDB = createAsyncThunk(
  'Customer/switch-customers-db',
  async ({ id, name, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.SwitchCustomerDB(id)
      const resData = res.data
      console.log(res)
      if (res?.status === 204) {
        callback()
        toast.success(`Customer switched successfully to ${name}`)
      }

      return fulfillWithValue(resData)
    } catch (err) {
      console.log('err : ', err)
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const UnsetDB = createAsyncThunk(
  'Customer/unset-customers-db',
  async ({ callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.UnsetCustomersDB()
      const resData = res.data

      if (res?.status === 204) {
        callback()
        toast.success('Customer DB reset successfully')
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

export const GetAllCustomers = createAsyncThunk(
  'Customer/all-customers',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCustomers(1, 'all')
      const resData = res.data

      let data = resData?.data.map(item => {
        return {
          id: item?.id,
          name: item?.company_name
        }
      })

      return fulfillWithValue(data)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description || err?.response?.data?.message)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Customer by id
export const getCustomerByIdAction = createAsyncThunk(
  'Customers/getCustomerById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getCustomerById(id)
      const resData = res.data

      if (res.status === 200) {
        toast.success('Customer fetched successfully')
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

// register Customer
export const registerCustomerAction = createAsyncThunk(
  'Customers/registerCustomer',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerCustomer(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Customer registered successfully')
        callback()
      }

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message)
    }
  }
)

// register Customer
export const registerWASLCustomerAction = createAsyncThunk(
  'Customers/registerWaslCustomer',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerWaslCustomer(data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success('Customer registered successfully')
        callback()
      }

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message)
    }
  }
)

// update Customer
export const updateCustomerAction = createAsyncThunk(
  'Customers/updateCustomer',
  async ({ id, data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateCustomer(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success(`Customer updated successfully`)
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

// update wasl Customer
export const updateWaslCustomerAction = createAsyncThunk(
  'Customers/updateWaslCustomer',
  async ({ id, data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateWaslCustomer(id, data)
      const resData = res.data
      if (res?.status === 200) {
        toast.success(`Customer updated successfully`)
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

// delete customer
export const deleteCustomerTypeAction = createAsyncThunk(
  'Customers/deleteCustomer',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteCustomer(id)
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

// delete wasl customer
export const deleteWaslCustomerTypeAction = createAsyncThunk(
  'Customers/deleteWaslCustomer',
  async ({ id, callback }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteWaslCustomer(id)
      if (res.status === 204) {
        toast.success('Customer deleted successfully')
        dispatch(getAllWASLCustomersAction({ page: 1, limit: 10 }))
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

export const handleLimitAction = createAsyncThunk('roles/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllCustomersAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('roles/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllCustomersAction({ page, limit }))
})

//WASL

export const handleWASLLimitAction = createAsyncThunk(
  'roles/handleWASLLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllWASLCustomersAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handleWASLPageAction = createAsyncThunk('roles/handleWASLPage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllWASLCustomersAction({ page, limit }))
})
