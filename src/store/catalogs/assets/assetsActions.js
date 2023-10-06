import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// ** Get All Asset list
export const getAllAssetAction = createAsyncThunk(
  'assets/getAllAssets',
  async ({ page, limit, slug, name }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllAssets(page, limit, name)
      const resData = res.data

      // toast.success('Assets List Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Assets..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// ** Get All Asset list
export const getAllWASLAssetAction = createAsyncThunk(
  'assets/getAllWASLAssets',
  async ({ page, limit, slug, name }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllWASLAssets(page, limit, name)
      const resData = res.data
      // toast.success('Assets List Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Assets..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

// ** get Asset by id
export const getAssetByIdAction = createAsyncThunk('assets/getAssetById', async (id, { rejectWithValue }) => {
  try {
    const res = await useJwt.getAssetById(id)
    const resData = res.data

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})

// ** register Asset
export const registerAssetAction = createAsyncThunk(
  'assets/registerAsset',
  async ({ data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerAsset(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Asset Type registered successfully')
        dispatch(getAllAssetAction({ page: 1, limit: 10, slug: data?.slug }))
      }
      callBack()

      return resData
    } catch (err) {
      console.log('error', err)
      toast.error('Error While Registering Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** update Asset
export const updateAssetAction = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateAsset(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllAssetAction({ page: 1, limit: 10 }))
      }
      callBack()

      return resData
    } catch (err) {
      toast.error('Error While Updating Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** delet Asset
export const deleteAssetAction = createAsyncThunk(
  'assets/deleteAsset',
  async ({ id, data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateAsset(id, data)
      const resData = res.data
      if (resData?.success) {
        toast.success(`${resData?.message}`)
        dispatch(getAllAssetAction({ page: 1, limit: 10 }))
      }
      callBack()

      return resData
    } catch (err) {
      toast.error('Error While Updating Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** update wasl Asset
export const updateWaslAssetAction = createAsyncThunk(
  'assets/updateWaslAsset',
  async ({ id, data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.updateWaslAsset(id, data)
      const resData = res.data
      callBack()
      toast.success(`${resData?.message}`)
      dispatch(getAllWASLAssetAction({ page: 1, limit: 10 }))

      return resData
    } catch (err) {
      toast.error('Error While Updating Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** delet wasl Asset
export const deleteWaslAssetAction = createAsyncThunk(
  'assets/deleteWaslAsset',
  async ({ id, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.deleteWaslAsset(id)
      const resData = res.data
      callBack()
      toast.success(`Deleted`)
      dispatch(getAllWASLAssetAction({ page: 1, limit: 10 }))

      return resData
    } catch (err) {
      toast.error('Error While delteing Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** register wasl Asset
export const registerWASLAssetAction = createAsyncThunk(
  'assets/registerWaslAsset',
  async ({ data, callBack }, { dispatch, rejectWithValue }) => {
    try {
      const res = await useJwt.registerWaslAsset(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Asset Type registered successfully')
        dispatch(getAllWASLAssetAction({ page: 1, limit: 10, slug: data?.slug }))
      }
      callBack()

      return resData
    } catch (err) {
      console.log('error', err)
      toast.error('Error While Registering Asset...')

      return rejectWithValue(err?.response?.data.data || err.message)
    }
  }
)

// ** Handle Asset Limit and Page Actions
export const handleLimitAction = createAsyncThunk('roles/handleLimit', async ({ newLimit, oldLimit }, { dispatch }) => {
  if (oldLimit !== newLimit) {
    dispatch(getAllAssetAction({ page: 1, limit: newLimit }))
  }
})

export const handlePageAction = createAsyncThunk('roles/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllAssetAction({ page, limit }))
})

export const handleWASLLimitAction = createAsyncThunk(
  'roles/handleWASLLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAllWASLAssetAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handleWASLPageAction = createAsyncThunk('roles/handleWASLPage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAllWASLAssetAction({ page, limit }))
})
