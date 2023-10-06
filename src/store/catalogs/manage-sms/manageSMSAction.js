import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

export const registerManageSMSAction = createAsyncThunk(
  'manageSMS/registerSmsForm',
  async (data, { rejectWithValue }) => {
    try {
      const res = await useJwt.registerSmsForm(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('SMS has been sent successfully')
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)
