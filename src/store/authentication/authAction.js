import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

// Actions
export const login = createAsyncThunk('auth/login', async ({ data, router }, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await useJwt.login(data)
    const resData = res.data

    if (resData?.data) {
      const token = resData?.data?.token

      useJwt.setToken(token)
      const returnUrl = router.query.returnUrl
      const role = resData?.data?.user?.roles[0]?.name
      const userId = resData?.data?.user?.roles[0]?.id
      const permissions = resData?.data?.user?.roles[0]?.permissions

      const permissionsList = permissions.map(permission => {
        const action = permission.name.split('-')[0]
        const subject = permission.name

        return { id: permission?.id, name: permission?.name, group: permission?.group, action, subject }
      })

      const user = {
        id: userId,
        role: role,
        permissions: permissionsList,
        name: resData?.data?.user?.name,
        email: resData?.data?.user?.email,
        is_super_admin: resData?.data?.user?.is_super_admin === 1 ? true : false,
        vps_id: resData?.data?.user?.vps_id
      }
      useJwt.setUserData(user)

      const redirectURL = returnUrl && returnUrl !== '/dashboard' ? returnUrl : '/dashboard'
      router.replace(redirectURL)
    }

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message.description || err.message)
  }
})

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    // console.log('register data : ', data)
    try {
      const res = await useJwt.register(data)
      console.log('res of register : ', res?.data)
      if (res?.data) {
        callback()
      }

      return fulfillWithValue(res?.data)
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message?.description || err?.message)
    }
  }
)

export const ForgotPasswordAction = createAsyncThunk(
  'auth/forgot-password',
  async ({ data, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.forgotPassword(data)
      console.log('res of forgotPassword : ', res)

      if (res?.status === 204) {
        console.log('action checking call back')
        callback()
      }

      return fulfillWithValue(res?.data)
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message?.description || err?.message)
    }
  }
)

export const ResetPasswordAction = createAsyncThunk(
  'auth/reset-password',
  async ({ data }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.resetPassword(data)
      console.log('res of reset password : ', res?.data)

      return fulfillWithValue(res?.data)
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message?.description || err?.message)
    }
  }
)

export const VerifyRegistrationAction = createAsyncThunk(
  'auth/verify-registration',
  async ({ id, callback }, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(id, 'id')
      const res = await useJwt.verifyRegistration({ token: id })
      if (res?.data?.data?.login_url) {
        callback(res?.data?.data?.login_url)
        console.log('url : ', res?.data?.data?.login_url)
      }

      console.log('res : ', res?.data)

      return fulfillWithValue(res?.data)
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message?.description || err?.message)
    }
  }
)

export const UpdateVpsInUserAuth = createAsyncThunk(
  'auth/update-vps',
  async ({ id, name, error }, { getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const currentState = await getState()
      const user = currentState.auth.user?.data?.user
      if (!user) {
        throw new Error(error)
      }

      // ** Updating the VPS information in the local storage
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || {}

      const updatedUserData = {
        ...storedUserData,
        vps_id: id,
        vps: {
          ...storedUserData.vps,
          id: id,
          poc_name: name
        }
      }
      useJwt.setUserData(updatedUserData)

      return fulfillWithValue(updatedUser)
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message?.description || err?.message)
    }
  }
)
