import { createSlice } from '@reduxjs/toolkit'
import { error, success } from '../../utils'
import { getAllGeofenceListAction, getAllGeofenceTypeAction } from './geofenceAction'

// ** initial state for slice
const initialState = {
  getAllGeofenceList: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    loading: false,
    error: null
  },
  getAllGeofenceTypesList: {
    data: [],
    error: null,
    loading: false,
    limit: 10,
    total: 0,
    page: 1
  }
}

export const geofenceSlice = createSlice({
  name: 'geofenceSlice',
  initialState: initialState,
  reducers: {
    // Reset Geofence on unmount or else
    resetGeofenceList: state => {
      state.getAllGeofenceList = {
        data: [],
        limit: 10,
        page: 1,
        total: 0
      }
    },
    resetGeofenceTypeList: state => {
      state.getAllGeofenceTypesList = {
        data: {},
        error: null,
        loading: false,
        limit: 10,
        total: 0,
        page: 1
      }
    }
  },
  extraReducers: builder => {
    builder

      // ** Get Geofence List
      .addCase(getAllGeofenceListAction.pending, state => {
        state.getAllGeofenceList.loading = true
      })
      .addCase(getAllGeofenceListAction.fulfilled, (state, action) => {
        success(state.getAllGeofenceList, action)
        state.getAllGeofenceList.data = action.payload?.data
        state.getAllGeofenceList.page = action.payload?.paging.current_page
        state.getAllGeofenceList.limit = action.payload?.paging.per_page
        state.getAllGeofenceList.total = action.payload?.paging.total
      })
      .addCase(getAllGeofenceListAction.rejected, (state, action) => {
        error(state.getAllGeofenceList, action)
      })

      // ** Get All Geofence Types
      .addCase(getAllGeofenceTypeAction.pending, state => {
        state.getAllGeofenceTypesList.loading = true
      })
      .addCase(getAllGeofenceTypeAction.fulfilled, (state, action) => {
        success(state.getAllGeofenceTypesList, action)
        state.getAllGeofenceTypesList.data = action.payload?.data
        state.getAllGeofenceTypesList.limit = action.payload?.paging.per_page
        state.getAllGeofenceTypesList.total = action.payload?.paging.total
        state.getAllGeofenceTypesList.page = action.payload?.paging.current_page
      })
      .addCase(getAllGeofenceTypeAction.rejected, (state, action) => {
        error(state.getAllGeofenceTypesList, action)
      })
  }
})

export const { resetGeofenceList, resetGeofenceTypeList } = geofenceSlice.actions

export default geofenceSlice.reducer
