import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

// ** Get All Asset list
export const getAssetInfoAction = createAsyncThunk(
  'assetsInfo/getAssetsInfo',
  async ({ page, limit, asset_ids }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAssetsInfo(page, limit, asset_ids)
      const resData = res.data
      toast.success('Assets List Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Assets..')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const handleLimitAction = createAsyncThunk(
  'assetsInfo/handleLimit',
  async ({ newLimit, oldLimit }, { dispatch }) => {
    if (oldLimit !== newLimit) {
      dispatch(getAssetInfoAction({ page: 1, limit: newLimit }))
    }
  }
)

export const handlePageAction = createAsyncThunk('assetsInfo/handlePage', async ({ page, limit }, { dispatch }) => {
  dispatch(getAssetInfoAction({ page, limit }))
})
