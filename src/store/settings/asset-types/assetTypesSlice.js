import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllAssetTypesAction,
  getAssetTypeByIdAction,
  registerAssetTypeAction,
  updateAssetTypeAction
} from './assetTypesAction'

export const AssetTypesSlice = createSlice({
  name: 'assetTypes',
  initialState: {
    loading: false,
    getAllAssetTypesList: {
      data: [],
      page: 1,
      limit: 10,
      total: 0
    },
    getAssetType: null,
    updateAssetType: null,
    registerAssetType: null
  },
  reducers: {
    resetGetAllAssetTypes: state => {
      state.getAllAssetTypesList = {
        data: [],
        page: 1,
        limit: 10,
        total: 0
      }
    },
    resetGetAssetType: state => {
      state.getAssetType = null
    },
    resetRegisterAssetType: state => {
      state.registerAssetType = null
    },
    resetUpdateAssetType: state => {
      state.updateAssetType = null
    }
  },
  extraReducers: builder => {
    builder

      // get All asset types
      .addCase(getAllAssetTypesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllAssetTypesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllAssetTypesList.data = action.payload?.data
        state.getAllAssetTypesList.total = action.payload?.data?.total || 0
        state.getAllAssetTypesList.limit = action.payload?.data?.per_page || 10
        state.getAllAssetTypesList.page = action.payload?.data?.current_page || 1
      })
      .addCase(getAllAssetTypesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllAssetTypesList.data = []
        state.getAllAssetTypesList.total = 0
      })

      // get asset types By Id
      .addCase(getAssetTypeByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getAssetTypeByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getAssetType = action.payload?.data
      })
      .addCase(getAssetTypeByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getAssetType = null
      })

      // register asset types
      .addCase(registerAssetTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(registerAssetTypeAction.fulfilled, (state, action) => {
        success(state)
        state.registerAssetType = action.payload
      })

      .addCase(registerAssetTypeAction.rejected, (state, action) => {
        error(state, action)
        state.registerAssetType = null
      })

      // update asset types
      .addCase(updateAssetTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(updateAssetTypeAction.fulfilled, (state, action) => {
        success(state)
        state.updateAssetType = action.payload
      })
      .addCase(updateAssetTypeAction.rejected, (state, action) => {
        error(state, action)
        state.updateAssetType = null
      })
  }
})

export const { resetGetAllAssetTypes, resetGetAssetType, resetRegisterAssetType, resetUpdateAssetType } =
  AssetTypesSlice.actions

export default AssetTypesSlice.reducer
