import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const TabAction = createAsyncThunk('tabs/tabAction', async ({ page, value }, { rejectWithValue }) => {
  try {
    return { page, value }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const TabsReducer = createSlice({
  name: 'tabs',
  initialState: {
    page: '',
    value: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(TabAction.fulfilled, (state, { payload }) => {
      state.page = payload.page
      state.value = payload.value
    })
  }
})

export default TabsReducer.reducer
