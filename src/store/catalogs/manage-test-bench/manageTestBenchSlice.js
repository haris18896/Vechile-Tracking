import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { registerManageTestBenchAction } from './manageTestBenchAction'

export const ManageTestBenchSlice = createSlice({
  name: 'manageTestBench',
  initialState: {
    loading: false,
    registerTestBench: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // register ManageSMS
      .addCase(registerManageTestBenchAction.pending, state => {
        state.loading = true
      })
      .addCase(registerManageTestBenchAction.fulfilled, (state, action) => {
        success(state)
        state.registerTestBench = action.payload
      })
      .addCase(registerManageTestBenchAction.rejected, (state, action) => {
        error(state, action)
      })
  }
})

export default ManageTestBenchSlice.reducer
