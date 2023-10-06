import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'

//get all plat type data
export const getAllPlateTypeAction = createAsyncThunk('plate/getTypes', async (data, { rejectWithValue }) => {
  try {
    const res = await useJwt.getPlateTypes()
    const resData = res?.data
    console.log('🚀 ~ file: plateTypeActions.js:11 ~ getAllPlateTypeAction ~ resData:', resData)

    return resData
  } catch (err) {
    toast.error('Error While Asset Count')

    return rejectWithValue(err?.message)
  }
})
