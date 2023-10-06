import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllResellerAction,
  getResellerByIdAction,
  registerResellerAction,
  updateResellerAction,
  deleteResellerAction
} from './resellerAction'

export const ResellerSlice = createSlice({
  name: 'reseller',
  initialState: {
    loading: false,
    getAllResellerList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    registerReseller: null,
    getReseller: null,
    updateReseller: null,
    deleteReseller: null
  },
  reducers: {
    resetGetAllReseller: state => {
      state.getAllResellerList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetResellerById: state => {
      state.getReseller = null
    },
    resetRegisterReseller: state => {
      state.registerReseller = null
    },
    resetUpdateReseller: state => {
      state.updateReseller = null
    }
  },
  extraReducers: builder => {
    builder

      // get All Reseller
      .addCase(getAllResellerAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllResellerAction.fulfilled, (state, action) => {
        success(state)
        state.getAllResellerList.data = action.payload?.data
        state.getAllResellerList.total = action.payload?.paging?.total
        state.getAllResellerList.page = action.payload?.paging?.current_page
        state.getAllResellerList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllResellerAction.rejected, (state, action) => {
        error(state, action)
        state.getAllResellerList.data = []
        state.getAllResellerList.total = 0
      })

      // get Reseller By Id
      .addCase(getResellerByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getResellerByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getReseller = action.payload
      })
      .addCase(getResellerByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getReseller = null
      })

      // register Reseller
      .addCase(registerResellerAction.pending, state => {
        state.loading = true
      })
      .addCase(registerResellerAction.fulfilled, (state, action) => {
        success(state)
        state.registerReseller = action.payload
      })

      .addCase(registerResellerAction.rejected, (state, action) => {
        error(state, action)
        state.registerReseller = null
      })

      // update Reseller
      .addCase(updateResellerAction.pending, state => {
        state.loading = true
      })
      .addCase(updateResellerAction.fulfilled, (state, action) => {
        success(state)
        state.updateReseller = action.payload
      })
      .addCase(updateResellerAction.rejected, (state, action) => {
        error(state, action)
        state.updateReseller = null
      })

      // delete Permission
      .addCase(deleteResellerAction.pending, state => {
        state.loading = true
      })
      .addCase(deleteResellerAction.fulfilled, (state, action) => {
        success(state)
        state.deleteReseller = action.payload
      })
      .addCase(deleteResellerAction.rejected, (state, action) => {
        error(state, action)
        state.deleteReseller = null
      })
  }
})

export const { resetGetAllReseller, resetGetResellerById, resetRegisterReseller, resetUpdateReseller } = ResellerSlice.actions

export default ResellerSlice.reducer
