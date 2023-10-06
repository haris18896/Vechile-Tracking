import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

export const registerManageEmailAction = createAsyncThunk(
  'manageEmail/registerEmailForm',
  async (data, { rejectWithValue }) => {
    try {
      const res = await useJwt.registerEmailForm(data)
      const resData = res.data
      if (resData?.success) {
        toast.success('Email has been sent successfully')
      }

      return resData
    } catch (err) {
      toast.error(err?.response?.data)

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)
