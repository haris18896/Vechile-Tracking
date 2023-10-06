import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// Get All Asset Types list
export const getAllAssetTypesAction = createAsyncThunk(
  'assetTypes/getAllAssetTypes',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllAssetTypes(page, limit)
      const resData = res.data

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// get Asset by id
export const getAssetTypeByIdAction = createAsyncThunk(
  'assetTypes/getAssetTypeById',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAssetTypeById(id)
      const resData = res.data
      if (res.status === 200) {
        toast.success('Asset type fetched successfully')
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

// register Asset
export const registerAssetTypeAction = createAsyncThunk(
  'assetTypes/registerAssetType',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.registerAssetType(data)
      const resData = res.data
      if (res.status === 200) {
        callback()
        toast.success('Asset Type registered successfully')
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

// update Asset
export const updateAssetTypeAction = createAsyncThunk(
  'assetTypes/updateAssetType',
  async ({ data, id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateAssetType(id, data)
      const resData = res.data
      if (res?.status === 200) {
        callback()
        toast.success(`Asset type has been updated successfully`)
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

export const deleteAssetTypeAction = createAsyncThunk(
  'assetType/deleteAssetType',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteAssetType(id)
      if (res.status === 204) {
      toast.success('Asset type deleted successfully')
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

export const handleLimitAction = createAsyncThunk(
  'assetTypes/handleLimit',
  async ({ newLimit, oldLimit, slug }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllAssetTypesAction({ page: 1, limit: newLimit, slug }))
    }
  }
)

export const handlePageAction = createAsyncThunk(
  'assetTypes/handlePage',
  async ({ page, limit, slug }, { dispatch }) => {
    dispatch(getAllAssetTypesAction({ page, limit, slug }))
  }
)
