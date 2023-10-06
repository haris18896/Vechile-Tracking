import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Group list
export const getAllGroupAction = createAsyncThunk(
  'group/getAllGroup',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllGroup(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching Group List...')
      
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Group by id
export const getGroupByIdAction = createAsyncThunk('group/getGroupById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getGroupById(id)
    const resData = res.data
    console.log('check response data ==>', resData)

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// register Group
export const registerGroupAction = createAsyncThunk(
  'group/registerGroup',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerGroup(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Group registered successfully')
        dispatch(getAllGroupAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update Group
export const updateGroupAction = createAsyncThunk(
  'group/updateGroup',
  async ({ id, data, slug }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateGroup(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllGroupAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      console.log('check error ==>', err?.response?.data?.message)
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteGroupAction = createAsyncThunk('group/deleteGroup', async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await useJwt.deleteGroup(id)
    const resData = res.data
    if (resData?.success) {
      toast.success(`${resData?.message}`)
      dispatch(getAllGroupAction({ page: 1, limit: 10 }))
    }

    return resData
  } catch (err) {
    toast.error(err?.response?.data?.message)

    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

export const handleLimitAction = createAsyncThunk('group/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllGroupAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('group/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllGroupAction({ page, limit }))
})
