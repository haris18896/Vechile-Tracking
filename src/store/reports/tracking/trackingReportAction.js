import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'

// ** TrackData Reports Get action
export const getAllTrackDataActions = createAsyncThunk(
  'trackReport/getAllTrackData',
  async ({ page, limit, asset_id, from_date_time, to_date_time }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getTrackDataReport(page, limit, asset_id, from_date_time, to_date_time)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fethcing Track Data')

      return rejectWithValue(err?.message)
    }
  }
)
