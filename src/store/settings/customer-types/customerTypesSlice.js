import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllCustomersTypesAction,
  getCustomerTypeByIdAction,
  registerCustomerTypeAction,
  updateCustomerTypeAction
} from './customerTypesAction'

export const CustomerTypesSlice = createSlice({
  name: 'customerTypes',
  initialState: {
    loading: false,
    getAllCustomerTypesList: {
      data: [],
      page: 1,
      limit: 10
    },
    getCustomerType: null,
    updateCustomerType: null,
    registerCustomerType: null
  },
  reducers: {
    resetGetAllCustomerTypes: state => {
      state.getAllCustomerTypesList = {
        data: [],
        page: 1,
        limit: 10
      }
    },
    resetGetCustomerTypeById: state => {
      state.getCustomerType = null
    },
    resetRegisterCustomerType: state => {
      state.registerCustomerType = null
    },
    resetUpdateCustomerType: state => {
      state.updateCustomerType = null
    }
  },
  extraReducers: builder => {
    builder

      // get All customer types
      .addCase(getAllCustomersTypesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllCustomersTypesAction.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.getAllCustomerTypesList.data = action.payload?.data
        state.getAllCustomerTypesList.total = action.payload?.paging?.total || 0
        state.getAllCustomerTypesList.page = action.payload?.paging?.current_page || 1
        state.getAllCustomerTypesList.limit = action.payload?.paging?.per_page || 10
      })
      .addCase(getAllCustomersTypesAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.getAllCustomerTypesList.data = []
        state.getAllCustomerTypesList.total = 0
      })

      // get customer types By Id
      .addCase(getCustomerTypeByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getCustomerTypeByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getCustomerType = action.payload?.data
      })
      .addCase(getCustomerTypeByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getCustomerType = null
      })

      // register customer types
      .addCase(registerCustomerTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(registerCustomerTypeAction.fulfilled, (state, action) => {
        success(state)
        state.registerCustomerType = action.payload
      })

      .addCase(registerCustomerTypeAction.rejected, (state, action) => {
        error(state, action)
        state.registerCustomerType = null
      })

      // update customer types
      .addCase(updateCustomerTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(updateCustomerTypeAction.fulfilled, (state, action) => {
        success(state)
        state.updateCustomerType = action.payload
      })
      .addCase(updateCustomerTypeAction.rejected, (state, action) => {
        error(state, action)
        state.updateCustomerType = null
      })
  }
})

export const {
  resetGetAllCustomerTypes,
  resetGetCustomerTypeById,
  resetRegisterCustomerType,
  resetUpdateCustomerType
} = CustomerTypesSlice.actions

export default CustomerTypesSlice.reducer
