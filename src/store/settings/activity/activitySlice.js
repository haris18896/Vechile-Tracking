import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'
import {
  deleteActivityAction,
  getActivityByIdAction,
  getAllActivitiesAction,
  registerActivityAction,
  updateActivityAction
} from './activityAction'

export const ActivityReducer = createSlice({
  name: 'activity',
  initialState: {
    loading: false,
    getAllActivities: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    registerActivity: null,
    getActivity: null,
    updateActivity: null,
    deleteActivity: null
  },
  reducers: {
    resetGetAllActivities: state => {
      state.getAllActivities = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    },
    resetGetActivityById: state => {
      state.getActivity = null
    },
    resetRegisterActivity: state => {
      state.registerActivity = null
    },
    resetUpdateActivity: state => {
      state.updateActivity = null
    }
  },
  extraReducers: builder => {
    builder

      // get All Activities
      .addCase(getAllActivitiesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllActivitiesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllActivities.data = action.payload?.data
        state.getAllActivities.total = action.payload?.paging?.total || 0
        state.getAllActivities.page = action.payload?.paging?.current_page || 1
        state.getAllActivities.limit = action.payload?.paging?.per_page || 10
      })
      .addCase(getAllActivitiesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllActivities.data = []
        state.getAllActivities.total = 0
        state.getAllActivities.page = 1
        state.getAllActivities.limit = 10
      })

      // get Activity By Id
      .addCase(getActivityByIdAction.pending, state => {
        state.loading = true
      })
      .addCase(getActivityByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getActivity = action.payload
      })
      .addCase(getActivityByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getActivity = null
      })

      // register Activity
      .addCase(registerActivityAction.pending, state => {
        state.loading = true
      })
      .addCase(registerActivityAction.fulfilled, (state, action) => {
        success(state)
        state.registerActivity = action.payload
      })

      .addCase(registerActivityAction.rejected, (state, action) => {
        error(state, action)
        state.registerActivity = null
      })

      // update Activity
      .addCase(updateActivityAction.pending, state => {
        state.loading = true
      })
      .addCase(updateActivityAction.fulfilled, (state, action) => {
        success(state)
        state.updateActivity = action.payload
      })
      .addCase(updateActivityAction.rejected, (state, action) => {
        error(state, action)
        state.updateActivity = null
      })

      // delete Activity
      .addCase(deleteActivityAction.pending, state => {
        state.loading = true
      })
      .addCase(deleteActivityAction.fulfilled, (state, action) => {
        success(state)
        state.deleteActivity = action.payload
      })
      .addCase(deleteActivityAction.rejected, (state, action) => {
        error(state, action)
        state.deleteActivity = null
      })
  }
})

export const { resetGetAllActivities, resetGetActivityById, resetRegisterActivity, resetUpdateActivity } =
  ActivityReducer.actions

export default ActivityReducer.reducer
