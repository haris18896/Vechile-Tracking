import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllEmailTemplateAction,
  getEmailTemplateByIdAction,
  registerEmailTemplateAction,
  updateEmailTemplateAction,
  deleteEmailTemplateAction
} from './emailTemplateAction'

export const EmailTemplateSlice = createSlice({
  name: 'emailTemplate',
  initialState: {
    loading: false,
    registerEmailTemplate: null,
    getAllEmailTemplateList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getEmailTemplatePending: false,
    updatePending: false,
    getEmailTemplate: null,
    updateEmailTemplate: null,
    deletePending: false
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All EmailTemplate
      .addCase(getAllEmailTemplateAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllEmailTemplateAction.fulfilled, (state, action) => {
        success(state)
        state.getAllEmailTemplateList.data = action.payload?.data?.data
        state.getAllEmailTemplateList.total = action.payload?.data?.total
        state.getAllEmailTemplateList.page = action.payload?.data?.current_page
        state.getAllEmailTemplateList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllEmailTemplateAction.rejected, (state, action) => {
        error(state, action)
        state.getAllEmailTemplateList.data = []
        state.getAllEmailTemplateList.total = 0
      })

      // get EmailTemplate By Id
      .addCase(getEmailTemplateByIdAction.pending, state => {
        state.getEmailTemplatePending = true
      })
      .addCase(getEmailTemplateByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getEmailTemplatePending = false
        state.getEmailTemplate = action.payload
      })
      .addCase(getEmailTemplateByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getEmailTemplatePending = false
        state.getEmailTemplate = null
      })

      // register EmailTemplate
      .addCase(registerEmailTemplateAction.pending, state => {
        state.loading = true
      })
      .addCase(registerEmailTemplateAction.fulfilled, (state, action) => {
        success(state)
        state.registerEmailTemplate = action.payload
      })

      .addCase(registerEmailTemplateAction.rejected, (state, action) => {
        error(state, action)
        state.registerEmailTemplate = null
      })

      // update EmailTemplate
      .addCase(updateEmailTemplateAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateEmailTemplateAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateEmailTemplate = action.payload
      })
      .addCase(updateEmailTemplateAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateEmailTemplate = null
      })

      // delete EmailTemplate
      .addCase(deleteEmailTemplateAction.pending, state => {
        state.deletePending = true
      })
      .addCase(deleteEmailTemplateAction.fulfilled, state => {
        state.deletePending = false
      })
      .addCase(deleteEmailTemplateAction.rejected, state => {
        state.deletePending = false
      })
  }
})

export default EmailTemplateSlice.reducer
