import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { registerManageSMSAction } from './manageSMSAction'

export const ManageSMSSlice = createSlice({
  name: 'manageSMS',
  initialState: {
    loading: false,
    sendEmail: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // register ManageSMS
      .addCase(registerManageSMSAction.pending, state => {
        state.loading = true
      })
      .addCase(registerManageSMSAction.fulfilled, (state, action) => {
        success(state)
        state.sendEmail = action.payload
      })
      .addCase(registerManageSMSAction.rejected, (state, action) => {
        error(state, action)
      })
  }
})

export default ManageSMSSlice.reducer
