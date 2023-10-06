import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  GetAllCustomers,
  updateCustomerAction,
  getAllCustomersAction,
  getCustomerByIdAction,
  registerCustomerAction,
  SwitchDB,
  getAllWASLCustomersAction,
  updateWaslCustomerAction
} from './customersActions'

export const CustomerSlice = createSlice({
  name: 'customers',
  initialState: {
    loading: false,
    registerCustomer: null,
    allCustomers: [],
    switchCustomerId: null,
    getAllCustomersList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getAllWASLCustomersList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getCustomer: null,
    updateCustomer: null
  },
  reducers: {
    resetGetAllCustomers: state => {
      state.getAllCustomersList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetCustomerById: state => {
      state.getCustomer = null
    },
    resetRegisterCustomer: state => {
      state.registerCustomer = null
    },
    resetUpdateCustomer: state => {
      state.updateCustomer = null
    },
    resetFieldState: (state, action) => {
      const field = action.payload
      if (state.error?.[field]) {
        state.error[field] = null
      }
    }
  },
  extraReducers: builder => {
    builder
      // all Customers for Nav bar
      .addCase(GetAllCustomers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(GetAllCustomers.fulfilled, (state, action) => {
        state.allCustomers = action.payload
        success(state)
      })
      .addCase(GetAllCustomers.rejected, (state, action) => {
        error(state, action)
        state.allCustomers = []
      })

      // get All customers
      .addCase(getAllCustomersAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllCustomersAction.fulfilled, (state, action) => {
        success(state)
        state.getAllCustomersList.data = action.payload?.data
        state.getAllCustomersList.total = action.payload?.paging?.total
        state.getAllCustomersList.page = action.payload?.paging?.current_page
        state.getAllCustomersList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllCustomersAction.rejected, (state, action) => {
        error(state, action)
        state.getAllCustomersList.data = []
        state.getAllCustomersList.total = 0
      })

      // get All wasl customers
      .addCase(getAllWASLCustomersAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllWASLCustomersAction.fulfilled, (state, action) => {
        success(state)
        state.getAllWASLCustomersList.data = action.payload?.data
        state.getAllWASLCustomersList.total = action.payload?.paging?.total
        state.getAllWASLCustomersList.page = action.payload?.paging?.current_page
        state.getAllWASLCustomersList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllWASLCustomersAction.rejected, (state, action) => {
        error(state, action)
        state.getAllWASLCustomersList.data = []
        state.getAllWASLCustomersList.total = 0
      })

      // get customer By Id
      .addCase(getCustomerByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getCustomerByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getCustomer = action.payload
      })
      .addCase(getCustomerByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getCustomer = null
      })

      // switch customer id
      .addCase(SwitchDB.pending, state => {})
      .addCase(SwitchDB.fulfilled, (state, action) => {
        state.switchCustomerId = action.payload.vps
      })
      .addCase(SwitchDB.rejected, (state, action) => {
        error(state, action)
      })

      // register customer
      .addCase(registerCustomerAction.pending, state => {
        state.loading = true
      })
      .addCase(registerCustomerAction.fulfilled, (state, action) => {
        success(state)
        state.registerCustomer = action.payload
      })

      .addCase(registerCustomerAction.rejected, (state, action) => {
        state.loading = false
        state.registerCustomer = null
      })

      // update customer
      .addCase(updateCustomerAction.pending, state => {
        state.loading = true
      })
      .addCase(updateCustomerAction.fulfilled, (state, action) => {
        success(state)
        state.updateCustomer = action.payload
      })
      .addCase(updateCustomerAction.rejected, (state, action) => {
        state.loading = false
        state.updateCustomer = null
        state.error = action.payload.description
      })

      // update wasl customer
      .addCase(updateWaslCustomerAction.pending, state => {
        state.loading = true
      })
      .addCase(updateWaslCustomerAction.fulfilled, (state, action) => {
        success(state)
        state.updateCustomer = action.payload
      })
      .addCase(updateWaslCustomerAction.rejected, (state, action) => {
        state.loading = false
        state.updateCustomer = null
        state.error = action.payload.description
      })
  }
})

export const {
  resetFieldState,
  resetGetAllCustomers,
  resetGetCustomerById,
  resetRegisterCustomer,
  resetUpdateCustomer
} = CustomerSlice.actions

export default CustomerSlice.reducer
