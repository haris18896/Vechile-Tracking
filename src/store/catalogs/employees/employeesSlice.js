import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import { getAllEmployeesAction, getEmployeeByIdAction, registerEmployeeAction, updateEmployeeAction } from './employeesActions'

export const EmployeesSlice = createSlice({
  name: 'Employees',
  initialState: {
    loading: false,
    registerEmployee: null,
    getAllEmployeesList: {
      data: [],
      total: 0,
      page: 1,
      limit: 10
    },
    getEmployeePending: false,
    updatePending: false,
    getEmployee: null,
    updateEmployee: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // get All Employees
      .addCase(getAllEmployeesAction.pending, state => {
        state.loading = true
      })
      .addCase(getAllEmployeesAction.fulfilled, (state, action) => {
        success(state)
        state.getAllEmployeesList.data = action.payload?.data?.data
        state.getAllEmployeesList.total = action.payload?.data?.total
        state.getAllEmployeesList.page = action.payload?.data?.current_page
        state.getAllEmployeesList.limit = action.payload?.data?.per_page
      })
      .addCase(getAllEmployeesAction.rejected, (state, action) => {
        error(state, action)
        state.getAllEmployeesList.data = []
        state.getAllEmployeesList.total = 0
      })

      // get Employee By Id
      .addCase(getEmployeeByIdAction.pending, state => {
        state.getEmployeePending = true
      })
      .addCase(getEmployeeByIdAction.fulfilled, (state, action) => {
        success(state)
        state.getEmployeePending = false
        state.getEmployee = action.payload
      })
      .addCase(getEmployeeByIdAction.rejected, (state, action) => {
        error(state, action)
        state.getEmployeePending = false
        state.getEmployee = null
      })

      // register Employee
      .addCase(registerEmployeeAction.pending, state => {
        state.loading = true
      })
      .addCase(registerEmployeeAction.fulfilled, (state, action) => {
        success(state)
        state.registerEmployee = action.payload
      })

      .addCase(registerEmployeeAction.rejected, (state, action) => {
        error(state, action)
        state.registerEmployee = null
      })

      // update Employee
      .addCase(updateEmployeeAction.pending, state => {
        state.updatePending = true
      })
      .addCase(updateEmployeeAction.fulfilled, (state, action) => {
        success(state)
        state.updatePending = false
        state.updateEmployee = action.payload
      })
      .addCase(updateEmployeeAction.rejected, (state, action) => {
        error(state, action)
        state.updatePending = false
        state.updateEmployee = null
      })
  }
})

export default EmployeesSlice.reducer
