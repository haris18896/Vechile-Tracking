import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { registerManageEmailAction } from './manageEmailAction'

export const ManageEmailSlice = createSlice({
  name: 'manageEmail',
  initialState: {
    loading: false,
    sendEmail: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // register ManageSMS
      .addCase(registerManageEmailAction.pending, state => {
        state.loading = true
      })
      .addCase(registerManageEmailAction.fulfilled, (state, action) => {
        success(state)
        state.sendEmail = action.payload
      })
      .addCase(registerManageEmailAction.rejected, (state, action) => {
        error(state, action)
      })
  }
})

export default ManageEmailSlice.reducer
