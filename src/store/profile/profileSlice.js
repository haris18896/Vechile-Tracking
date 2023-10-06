import { createSlice } from '@reduxjs/toolkit'
import { UpdateUserProfileAction, SwitchVPS } from './profileAction'

// Reducers
export const ProfileReducer = createSlice({
  name: 'profile',
  initialState: {
    updateUserProfilePending: false,
    vpsSwitchPending: false,
    updateUserProfileData: {},
    vpsSwitchData: {},
    error: null
  },
  reducers: {
    resetUpdateUserProfile: state => {
      state.updateUserProfileData = {}
    }
  },
  extraReducers: builder => {
    builder
      // Update User Profile
      .addCase(UpdateUserProfileAction.pending, state => {
        state.updateUserProfilePending = true
      })
      .addCase(UpdateUserProfileAction.fulfilled, (state, action) => {
        state.error = null
        state.updateUserProfilePending = false
        state.updateUserProfileData = action.payload
      })
      .addCase(UpdateUserProfileAction.rejected, (state, action) => {
        state.error = action.payload
        state.updateUserProfileData = {}
        state.updateUserProfilePending = false
      })

    // Switch VPS
      .addCase(SwitchVPS.pending, state => {
      state.vpsSwitchPending = true
    })
      .addCase(SwitchVPS.fulfilled, (state, action) => {
      state.error = null
      state.vpsSwitchPending = false
      state.vpsSwitchData = action.payload
    })
      .addCase(SwitchVPS.rejected, (state, action) => {
      state.error = action.payload
      state.vpsSwitchData = {}
      state.vpsSwitchPending = false
      })
  }
})

export const { resetUpdateUserProfile, resetUpdateUserPassword } = ProfileReducer.actions

export default ProfileReducer.reducer
