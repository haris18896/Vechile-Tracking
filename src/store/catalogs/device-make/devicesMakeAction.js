import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'

export const getAllDevicesMakeAction = createAsyncThunk(
  'devicesMake/getAllDevicesMake',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllDevicesMake(page, limit)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fetching List')

      return rejectWithValue(err?.response?.data.message?.type || err?.response?.data.message?.type || err.message)
    }
  }
)
