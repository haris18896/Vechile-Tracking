import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAssetInfoAction, } from './assetsInfoActions'

export const AssetsInfoSlice = createSlice({
  name: 'assetsInfo',
  initialState: {
    loading: false,
    getAssetInfoList: {
      data: [],
      page: 1,
      limit: 10
    },
  },
  reducers: {
    resetAssetsInfo: state => {
      state.getAssetInfoList = {
        data: [],
        page: 1,
        limit: 10
      }
    },
  },
  extraReducers: builder => {
    builder

      // get All asset
      .addCase(getAssetInfoAction.pending, state => {
        state.loading = true
      })
      .addCase(getAssetInfoAction.fulfilled, (state, action) => {
        success(state)
        state.getAssetInfoList.data = action.payload?.data
        state.getAssetInfoList.page = action.payload?.paging?.current_page || 1
        state.getAssetInfoList.limit = action.payload?.paging?.per_page || 10
        state.getAssetInfoList.total = action.payload?.paging?.total
      })
      .addCase(getAssetInfoAction.rejected, (state, action) => {
        error(state, action)
        state.getAssetInfoList.data = []
        state.getAssetInfoList.total = 0
      })

  }
})

export const { resetAssetsInfo } = AssetsInfoSlice.actions

export default AssetsInfoSlice.reducer
