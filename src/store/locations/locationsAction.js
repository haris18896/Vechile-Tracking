import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

import toast from 'react-hot-toast'
import axios from 'axios'

export const getAllCountriesAction = createAsyncThunk(
  'location/getAllCountries',
  async ({ page, limit }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCountries(page, limit)
      const resData = res.data

      return fulfillWithValue(resData)
    } catch (err) {
      if (typeof err?.response?.data?.message?.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const getAllStatesAction = createAsyncThunk(
  'location/getAllStates',
  async ({ page, limit, countryId }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllStates(page, limit, countryId)
      const resData = res.data

      return resData
    } catch (err) {
      if (typeof err?.response?.data?.message?.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const getAllCitiesAction = createAsyncThunk(
  'location/getAllCities',
  async ({ page, limit, stateId }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAllCities(page, limit, stateId)
      const resData = res.data

      return resData
    } catch (err) {
      if (typeof err?.response?.data?.message?.description === 'string') {
        toast.error(err?.response?.data?.message?.description)
      }

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const getReverseGeocodeAction = createAsyncThunk(
  'location/getAddress',
  async ({ lat, lng, apiKey }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getAddress(lat, lng, apiKey)

      const resData = res.data
      toast.success('Address Fetched Successfully')

      return resData
    } catch (err) {
      toast.error('Error While Fetching Address...')

      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)
