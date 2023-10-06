import toast from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ToastComponent } from 'src/components/toast'

// Get All permissions list
export const getAllPermissionsAction = createAsyncThunk(
  'permission/getAllPermissions',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { page, limit } = payload
      const res = await useJwt.getAllPermissions(page, limit)
      const resData = res.data
      useJwt.setData('totalPermissions', resData?.paging?.total)

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get permission by id
export const getPermissionByIdAction = createAsyncThunk(
  'permission/getPermissionById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getPermissionById(id)
      const resData = res.data
      toast.success('Permission fetched successfully')

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register permission
export const registerPermissionAction = createAsyncThunk(
  'permission/registerPermission',
  async ({ data, callback }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerPermission(data)
      const resData = res.data
      if (res?.status === 200) {
        callback()
        toast.success('Permission created successfully')
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

// update permission
export const updatePermissionAction = createAsyncThunk(
  'permission/updatePermission',
  async ({ data, id, callback }, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updatePermission(id, data)
      const resData = res.data

      if (res?.status === 200) {
        toast.success('Permission updated successfully')
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

// delete permission
export const deletePermissionAction = createAsyncThunk(
  'permission/deletePermission',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deletePermission(id)
      const resData = res.data
      if (res.status === 204) {
        callback()
        toast.success('permission deleted successfully')
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
  'permissions/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllPermissionsAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('permissions/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllPermissionsAction({ page, limit }))
})
