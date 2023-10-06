import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllSpeedGraphAction } from './speedActions'

export const SpeedSlice = createSlice({
  name: 'accounts',
  initialState: {
    loading: false,
    registerCustomer: null,
    getAllCustomersList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getCustomer: null,
    updateCustomer: null,
    deleteCustomer: null,

    getSpeedGraphList: [],
    speedGraphPaging: {},
    speedGraphHeaderData: {
      asset_id: 0,
      from_date_time: null,
      to_date_time: null
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //speed graph list
      .addCase(getAllSpeedGraphAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllSpeedGraphAction.fulfilled, (state, action) => {
        success(state, action)
        state.getSpeedGraphList = action.payload?.data
        state.speedGraphPaging = action.payload.paging
        state.speedGraphHeaderData = action.meta.arg
      })
      .addCase(getAllSpeedGraphAction.rejected, (state, action) => {
        state.loading = false
        error(state, action)
      })
  }
})

export default SpeedSlice.reducer
