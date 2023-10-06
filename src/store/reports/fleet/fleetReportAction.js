import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import useJwt from 'src/auth/jwt/useJwt'

// ** Fleet Summary Reports Get action
export const getAllFleetSummaryActions = createAsyncThunk(
  'fleetReport/getAllFleet',
  async ({ page, limit, asset_id, from_date_time, to_date_time }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getFleetSummaryReport(page, limit, asset_id, from_date_time, to_date_time)
      const resData = res?.data

      return resData
    } catch (err) {
      toast.error('Error While Fethcing Fleet')

      return rejectWithValue(err?.message)
    }
  }
)
