import { createSlice } from '@reduxjs/toolkit'
import { success, error } from 'src/store/utils'

import {
  getAllCountriesAction,
  getAllStatesAction,
  getAllCitiesAction,
  getReverseGeocodeAction
} from './locationsAction'

export const LocationsSlice = createSlice({
  name: 'locations',
  initialState: {
    countriesPending: false,
    getAllCountriesList: {
      data: [],
      page: 1,
      limit: 10
    },
    statesPending: false,
    getAllStatesList: {
      data: [],
      page: 1,
      limit: 10
    },
    citiesPending: false,
    getAllCitiesList: {
      data: [],
      page: 1,
      limit: 10
    },
    loading: false,
    getAddressList: {
      data: [],
      lat: '',
      lng: ''
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // ** Countries
      .addCase(getAllCountriesAction.pending, state => {
        state.countriesPending = true
      })
      .addCase(getAllCountriesAction.fulfilled, (state, action) => {
        success(state)
        state.countriesPending = false
        state.getAllCountriesList.data = action.payload?.data
        state.getAllCountriesList.page = action.payload?.data?.current_page || 1
        state.getAllCountriesList.limit = action.payload?.data?.per_page || 10
      })
      .addCase(getAllCountriesAction.rejected, (state, action) => {
        error(state, action)
        state.countriesPending = false
        state.getAllCountriesList.data = []
        state.getAllCountriesList.total = 0
      })

      // ** States
      .addCase(getAllStatesAction.pending, state => {
        state.statesPending = true
      })
      .addCase(getAllStatesAction.fulfilled, (state, action) => {
        success(state)
        state.statesPending = false
        state.getAllStatesList.data = action.payload?.data
        state.getAllStatesList.page = action.payload?.data?.current_page || 1
        state.getAllStatesList.limit = action.payload?.data?.per_page || 10
      })
      .addCase(getAllStatesAction.rejected, (state, action) => {
        error(state, action)
        state.statesPending = false
        state.getAllStatesList.data = []
        state.getAllStatesList.total = 0
      })

      // ** Cities
      .addCase(getAllCitiesAction.pending, state => {
        state.citiesPending = true
      })
      .addCase(getAllCitiesAction.fulfilled, (state, action) => {
        success(state)
        state.citiesPending = false
        state.getAllCitiesList.data = action.payload?.data
        state.getAllCitiesList.page = action.payload?.data?.current_page || 1
        state.getAllCitiesList.limit = action.payload?.data?.per_page || 10
      })
      .addCase(getAllCitiesAction.rejected, (state, action) => {
        error(state, action)
        state.citiesPending = false
        state.getAllCitiesList.data = []
        state.getAllCitiesList.total = 0
      })

      // ** Geocode Address
      .addCase(getReverseGeocodeAction.pending, state => {
        state.loading = true
      })
      .addCase(getReverseGeocodeAction.fulfilled, (state, action) => {
        success(state)
        state.getAddressList.data = action.payload?.data?.data
        state.getAddressList.lat = action.payload?.data?.lat || ''
        state.getAddressList.lng = action.payload?.data?.lng || ''
      })
      .addCase(getReverseGeocodeAction.rejected, (state, action) => {
        error(state, action)
        state.getAddressList.data = []
        state.getAddressList.total = 0
      })
  }
})

export default LocationsSlice.reducer
