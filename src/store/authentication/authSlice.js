import { createSlice } from '@reduxjs/toolkit'
import {
  login,
  registerUser,
  UpdateVpsInUserAuth,
  ForgotPasswordAction,
  ResetPasswordAction,
  VerifyRegistrationAction
} from './authAction'

// Reducers
export const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    loginInProgress: false,
    registerPending: false,
    forgotPasswordPending: false,
    resetPasswordPending: false,
    verifyRegistrationPending: false,
    user: {},
    registerUser: {},
    forgotPasswordData: {},
    resetPasswordData: {},
    verifyRegistrationData: {},
    error: null
  },
  reducers: {
    handleLogout: state => {
      state.user = {}
      localStorage.clear()
    },
    resetRegisterUser: state => {
      state.registerUser = {}
      state.error = null
    },
    resetForgotPassword: state => {
      state.forgotPasswordData = {}
      state.error = null
    },
    resetResetPassword: state => {
      state.resetPasswordData = {}
      state.error = null
    },
    restVerifyRegistration: state => {
      state.verifyRegistrationData = {}
      state.error = null
    },
    resetFieldState: (state, action) => {
      const field = action.payload
      if (state.error?.[field]) {
        state.error[field] = null
      }
    },
    resetLoginError: (state, action) => {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginInProgress = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginInProgress = false
        state.error = null
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginInProgress = false
        state.error = action.payload
        state.user = null
      })

      // Register User
      .addCase(registerUser.pending, state => {
        state.registerPending = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerPending = false
        state.registerUser = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerPending = false
        state.error = action.payload
      })

      // Forgot Password
      .addCase(ForgotPasswordAction.pending, state => {
        state.forgotPasswordPending = true
      })
      .addCase(ForgotPasswordAction.fulfilled, (state, action) => {
        state.forgotPasswordPending = false
        state.forgotPasswordData = action.payload
      })
      .addCase(ForgotPasswordAction.rejected, (state, action) => {
        state.forgotPasswordPending = false
        state.error = action.payload
      })

      // Reset Password
      .addCase(ResetPasswordAction.pending, state => {
        state.resetPasswordPending = true
      })
      .addCase(ResetPasswordAction.fulfilled, (state, action) => {
        state.resetPasswordPending = false
        state.resetPasswordData = action.payload
      })
      .addCase(ResetPasswordAction.rejected, (state, action) => {
        state.resetPasswordPending = false
        state.error = action.payload
      })

      // Verify Registration
      .addCase(VerifyRegistrationAction.pending, state => {
        state.verifyRegistrationPending = true
      })
      .addCase(VerifyRegistrationAction.fulfilled, (state, action) => {
        state.verifyRegistrationPending = false
        state.verifyRegistrationData = action.payload
      })
      .addCase(VerifyRegistrationAction.rejected, (state, action) => {
        state.verifyRegistrationPending = false
        state.error = action.payload
      })

      // ** Update VPS
      .addCase(UpdateVpsInUserAuth.fulfilled, (state, action) => {
        state.user.data.user = action.payload
      })
  }
})

export const {
  handleLogout,
  resetLoginError,
  resetFieldState,
  resetRegisterUser,
  resetResetPassword,
  resetForgotPassword
} = AuthReducer.actions

export default AuthReducer.reducer
