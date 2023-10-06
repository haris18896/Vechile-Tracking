import { createSlice } from '@reduxjs/toolkit'
import { getAllDevicesMakeAction } from './devicesMakeAction'
import { success } from 'src/store/utils'

const initialState = {
  loading: false,
  getAllDevicesMakeList: {
    data: [],
    page: 1,
    limit: 10
  },
  error: null
}

const devicesMakeSlice = createSlice({
  name: 'devicesMake',
  initialState: initialState,
  reducers: {
    resetDevicesMake: state => {
      state.getAllDevicesMakeList = {
        data: [],
        page: 1,
        limit: 10
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** Get all Devices Make
      .addCase(getAllDevicesMakeAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllDevicesMakeAction.fulfilled, (state, action) => {
        success(state, action)
        state.getAllDevicesMakeList.data = action.payload?.data
        state.getAllDevicesMakeList.page = action.payload?.paging?.page || 1
        state.getAllDevicesMakeList.limit = action?.payload?.paging?.limit || 10
      })
      .addCase(getAllDevicesMakeAction, (state, action) => {
        error(state, action)
        state.error = action.payload
      })
  }
})

export const { resetDevicesMake } = devicesMakeSlice.actions

export default devicesMakeSlice.reducer
