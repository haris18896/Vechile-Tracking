import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Users list
export const getAllUsersAction = createAsyncThunk(
  'User/getAllUsers',
  async ({ page, limit, slug, customer_id }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllUsers(page, limit, slug, customer_id)
      const resData = res.data

      // toast.success('Users List Fetched Successfully')
      useJwt.setData('totalUsers', resData?.data?.total)

      return resData
    } catch (err) {
      toast.error('Error While Fetching Users...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get User by id
export const getUserByIdAction = createAsyncThunk('User/getUserById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getUserById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register User
export const registerUserAction = createAsyncThunk(
  'User/registerUser',
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const res = await useJwt.registerUser(data)
      const resData = res.data
      toast.success('User Added Successfully')
      if (resData) callback()

      return resData
    } catch (err) {
      console.log(err, 'err')
      toast.error(
        err?.response?.data?.message?.description?.email ||
          err?.response?.data?.message?.description?.type ||
          err?.message
      )

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update User
export const updateUserAction = createAsyncThunk(
  'User/updateUser',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateUser(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllUsersAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk('roles/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllUsersAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('roles/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllUsersAction({ page, limit }))
})

// delete User
export const deleteUserAction = createAsyncThunk('User/deleteUser', async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await useJwt.deleteUser(id)
    const resData = res.data
    toast.success('User deleted successfully')
    dispatch(getAllUsersAction({ page: 1, limit: 10 }))

    return resData
  } catch (err) {
    toast.error('error while deleting user...')

    return rejectWithValue(err?.response?.data.message || err.message)
  }
})
