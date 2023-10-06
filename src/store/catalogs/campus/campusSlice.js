import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllCampusesAction, getCampusByIdAction, registerCampusAction, updateCampusAction } from './campusAction'

export const CampusesSlice = createSlice({
  name: 'Campus',
  initialState: {
    loading: false,
    registerCampus: null,
    getAllCampusesList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getCampusPending: false,
    updatePending: false,
    getCampus: null,
    updateCampus: null
  },
  reducers: {
    resetCampus: state => {
      state.getAllCampusesList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  extraReducers: builder => {
    builder

      // get All Campuses
      .addCase(getAllCampusesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllCampusesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllCampusesList.data = action.payload?.data?.data
        state.getAllCampusesList.total = action.payload?.paging?.total
        state.getAllCampusesList.page = action.payload?.paging?.current_page
        state.getAllCampusesList.limit = action.payload?.paging?.per_page
      })
      .addCase(getAllCampusesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllCampusesList.data = []
        state.getAllCampusesList.total = 0
      })

      // get Campus By Id
      .addCase(getCampusByIdAction.pending, state => {
        state.getCampusPending = true
      })
      .addCase(getCampusByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getCampusPending = false
        state.getCampus = action.payload
      })
      .addCase(getCampusByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getCampusPending = false
        state.getCampus = null
      })

      // register Campus
      .addCase(registerCampusAction.pending, state => {
        state.loading = true
      })
      .addCase(registerCampusAction.fulfilled, (state, action) => {
        success(state)
        state.registerCampus = action.payload
      })

      .addCase(registerCampusAction.rejected, (state, action) => {
        error(state, action)
        state.registerCampus = null
      })

      // update Campus
      .addCase(updateCampusAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateCampusAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateCampus = action.payload
      })
      .addCase(updateCampusAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateCampus = null
      })
  }
})

export const { resetCampus } = CampusesSlice.actions

export default CampusesSlice.reducer
