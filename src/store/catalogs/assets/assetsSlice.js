import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllAssetAction,
  getAllWASLAssetAction,
  getAssetByIdAction,
  registerAssetAction,
  updateAssetAction
} from './assetsActions'

export const AssetsSlice = createSlice({
  name: 'assets',
  initialState: {
    loading: false,
    registerAsset: null,
    getAllAssetList: {
      data: [],
      page: 1,
      limit: 10
    },
    getAllWASLAssetList: {
      data: [],
      page: 1,
      limit: 10
    },
    getAssetPending: false,
    updatePending: false,
    getAsset: null,
    updateAsset: null
  },
  reducers: {
    resetAssets: state => {
      state.getAllAssetList = {
        data: [],
        page: 1,
        limit: 10
      }
      state.getAsset = null
      state.loading = false
    },
    resetGetAsset: state => {
      state.getAsset = null
    }
  },
  extraReducers: builder => {
    builder

      // get All asset
      .addCase(getAllAssetAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllAssetAction.fulfilled, (state, action) => {
        success(state)
        state.getAllAssetList.data = action.payload?.data
        state.getAllAssetList.page = action.payload?.paging?.current_page || 1
        state.getAllAssetList.limit = action.payload?.paging?.per_page || 10
        state.getAllAssetList.total = action.payload?.paging?.total
      })
      .addCase(getAllAssetAction.rejected, (state, action) => {
        error(state, action)
        state.getAllAssetList.data = []
        state.getAllAssetList.total = 0
      })

      // get All wasl asset
      .addCase(getAllWASLAssetAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllWASLAssetAction.fulfilled, (state, action) => {
        success(state)
        state.getAllWASLAssetList.data = action.payload?.data
        state.getAllWASLAssetList.page = action.payload?.paging?.current_page || 1
        state.getAllWASLAssetList.limit = action.payload?.paging?.per_page || 10
        state.getAllWASLAssetList.total = action.payload?.paging?.total
      })
      .addCase(getAllWASLAssetAction.rejected, (state, action) => {
        error(state, action)
        state.getAllWASLAssetList.data = []
        state.getAllWASLAssetList.total = 0
      })

      // get asset By Id
      .addCase(getAssetByIdAction.pending, state => {
        state.getAssetPending = true
      })
      .addCase(getAssetByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getAssetPending = false
        state.getAsset = action.payload?.data
      })
      .addCase(getAssetByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getAssetPending = false
        state.getAsset = null
      })

      // register asset
      .addCase(registerAssetAction.pending, state => {
        state.loading = true
      })
      .addCase(registerAssetAction.fulfilled, (state, action) => {
        success(state)
        state.registerAsset = action.payload
      })

      .addCase(registerAssetAction.rejected, (state, action) => {
        error(state, action)
        state.registerAsset = null
      })

      // update asset
      .addCase(updateAssetAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateAssetAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateAsset = action.payload
      })
      .addCase(updateAssetAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateAsset = null
      })
  }
})

export const { resetAssets, resetGetAsset } = AssetsSlice.actions

export default AssetsSlice.reducer
