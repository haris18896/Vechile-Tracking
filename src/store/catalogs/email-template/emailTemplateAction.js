import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All EmailTemplate list
export const getAllEmailTemplateAction = createAsyncThunk(
  'emailTemplate/getAllEmailTemplate',
  async ({ page, limit, slug }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllEmailTemplate(page, limit, slug)
      const resData = res.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching EmailTemplate List...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get EmailTemplate by id
export const getEmailTemplateByIdAction = createAsyncThunk(
  'emailTemplate/getEmailTemplateById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await useJwt.getEmailTemplateById(id)
      const resData = res.data

      return resData
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// register EmailTemplate
export const registerEmailTemplateAction = createAsyncThunk(
  'emailTemplate/registerEmailTemplate',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerEmailTemplate(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('EmailTemplate registered successfully')
        dispatch(getAllEmailTemplateAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// update EmailTemplate
export const updateEmailTemplateAction = createAsyncThunk(
  'emailTemplate/updateEmailTemplate',
  async ({ id, data, slug }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateEmailTemplate(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllEmailTemplateAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const deleteEmailTemplateAction = createAsyncThunk(
  'emailTemplate/deleteEmailTemplate',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteEmailTemplate(id)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllEmailTemplateAction({ page: 1, limit: 10 }))
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data?.message)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'emailTemplate/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllEmailTemplateAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('emailTemplate/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllEmailTemplateAction({ page, limit }))
})
