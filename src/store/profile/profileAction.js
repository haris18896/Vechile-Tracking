import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

export const UpdateUserProfileAction = createAsyncThunk(
  'profile/update-user-profile',
  async ({ data }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.updateUserProfile(data)
      console.log('res', res)

      return fulfillWithValue(res.data)
    } catch (err) {
      console.log('err', err)

      return rejectWithValue(err?.response?.data.message.description || err.message)
    }
  }
)

export const SwitchVPS = createAsyncThunk('vps-switch', async ({callback}, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await useJwt.switchVPS()
    console.log('res', res)
    


    return fulfillWithValue(res.data)
  } catch (err) {
    
    console.log('Switch vps Error', err)

    return rejectWithValue(err?.response?.data.message.description || err.message)
  }
})
