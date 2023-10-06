import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllPlateTypeAction } from './plateTypeActions'

export const PlateTypeSlice = createSlice({
  name: 'plateType',
  initialState: {
    loading: false,
    platTypes: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //speed graph list
      .addCase(getAllPlateTypeAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllPlateTypeAction.fulfilled, (state, action) => {
        success(state, action)
        state.platTypes = action.payload?.data
      })
      .addCase(getAllPlateTypeAction.rejected, (state, action) => {
        state.loading = false
        error(state, action)
      })
  }
})

export default PlateTypeSlice.reducer
