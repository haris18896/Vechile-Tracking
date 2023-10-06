import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Employees list
export const getAllEmployeesAction = createAsyncThunk(
  'employee/getAllEmployees',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllEmployees(page, limit)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Employees List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Employee by id
export const getEmployeeByIdAction = createAsyncThunk('employee/getEmployeeById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getEmployeeById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register Employee
export const registerEmployeeAction = createAsyncThunk(
  'employee/registerEmployee',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerEmployee(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Employee registered successfully')
        dispatch(getAllEmployeesAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Employee
export const updateEmployeeAction = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateEmployee(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllEmployeesAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'employee/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllEmployeesAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('employee/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllEmployeesAction({ page, limit }))
})
