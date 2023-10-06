import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'

// ** Event Report Reports Get action
export const getAllEventReportAction = createAsyncThunk(
  'eventReport/index',
  async ({ page, limit, asset_id, from_date_time, to_date_time, event_id }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getEventReport(page, limit, asset_id, from_date_time, to_date_time, event_id)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fethcing Event Report')

      return rejectWithValue(err?.message)
    }
  }
)
