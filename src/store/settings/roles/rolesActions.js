import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Roles list
export const getAllRolesAction = createAsyncThunk(
  'roles/getAllRoles',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllRoles(page, limit)
      const resData = res.data
      useJwt.setData('totalRoles', resData?.roles?.total)

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get roles by id
export const getRoleByIdAction = createAsyncThunk(
  'roles/getRoleById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getRoleById(id)
      const resData = res.data
      toast.success('Role fetched successfully')

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register roles
export const registerRoleAction = createAsyncThunk(
  'roles/registerRole',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerRole(data)
      const resData = res.data
      console.log('data : ', res)
      if (res?.status === 200) {
        toast.success('Roles created successfully')
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

// update roles
export const updateRoleAction = createAsyncThunk(
  'roles/updateRole',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateRole(id, data)
      const resData = res.data
      if (resData) {
        toast.success('Roles updated successfully')
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

// delete roles
export const deleteRoleAction = createAsyncThunk(
  'roles/deleteRole',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteRole(id)
      toast.success('Roles deleted successfully')

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

export const handleLimitAction = createAsyncThunk('roles/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllRolesAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('roles/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllRolesAction({ page, limit }))
})
