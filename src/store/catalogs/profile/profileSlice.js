import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllProfilesAction, getProfileByIdAction, registerProfileAction, updateProfileAction } from './profileAction'

export const ProfilesSlice = createSlice({
  name: 'Profile',
  initialState: {
    loading: false,
    registerProfile: null,
    getAllProfilesList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getProfilePending: false,
    updatePending: false,
    getProfile: null,
    updateProfile: null
  },
  reducers: {
    resetProfile: state => {
      state.getAllProfilesList = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },

    resetGetProfile: state => {
      state.getProfile = null
    }
  },
  extraReducers: builder => {
    builder

      // get All Profiles
      .addCase(getAllProfilesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllProfilesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllProfilesList.data = action.payload?.data?.data
        state.getAllProfilesList.total = action.payload?.data?.total
        state.getAllProfilesList.page = action.payload?.data?.current_page
        state.getAllProfilesList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllProfilesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllProfilesList.data = []
        state.getAllProfilesList.total = 0
      })

      // get Profile By Id
      .addCase(getProfileByIdAction.pending, state => {
        state.getProfilePending = true
      })
      .addCase(getProfileByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getProfilePending = false
        state.getProfile = action.payload
      })
      .addCase(getProfileByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getProfilePending = false
        state.getProfile = null
      })

      // register Profile
      .addCase(registerProfileAction.pending, state => {
        state.loading = true
      })
      .addCase(registerProfileAction.fulfilled, (state, action) => {
        success(state)
        state.registerProfile = action.payload
      })

      .addCase(registerProfileAction.rejected, (state, action) => {
        error(state, action)
        state.registerProfile = null
      })

      // update Profile
      .addCase(updateProfileAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateProfile = action.payload
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateProfile = null
      })
  }
})

export const { resetProfile, resetGetProfile } = ProfilesSlice.actions

export default ProfilesSlice.reducer
