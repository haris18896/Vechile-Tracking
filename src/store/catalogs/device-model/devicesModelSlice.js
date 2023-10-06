import { createSlice } from '@reduxjs/toolkit'
import { success } from 'src/store/utils'
import { getAllDevicesModelAction } from './devicesModelAction'

const initialState = {
  loading: false,
  getAllDevicesModelList: {
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
    resetDevicesModel: state => {
      state.getAllDevicesModelList = {
        data: [],
        page: 1,
        limit: 10
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** Get all Devices Make
      .addCase(getAllDevicesModelAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllDevicesModelAction.fulfilled, (state, action) => {
        success(state, action)
        state.getAllDevicesModelList.data = action.payload?.data
        state.getAllDevicesModelList.page = action.payload?.paging?.page || 1
        state.getAllDevicesModelList.limit = action?.payload?.paging?.limit || 10
      })
      .addCase(getAllDevicesModelAction, (state, action) => {
        error(state, action)
        state.error = action.payload
      })
  }
})

export const { resetDevicesModel } = devicesMakeSlice.actions

export default devicesMakeSlice.reducer
