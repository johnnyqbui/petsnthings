import { createSlice } from '@reduxjs/toolkit'

// A slice for currentLocation
const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState: {
    currentLocation: '',
  },
  reducers: {
    setCurrentLocation: (state, { payload }) => {
      state.currentLocation = payload;
    },
  },
})

// Three actions generated from the slice
export const { setCurrentLocation } = currentLocationSlice.actions

// A selector
export const CurrentLocationSelector = state => state.currentLocation

// The reducer
export default currentLocationSlice.reducer