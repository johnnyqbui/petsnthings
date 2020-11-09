import { createSlice } from "@reduxjs/toolkit";

// A slice for currentLocation
const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    loading: false,
    hasErrors: false,
    data: ""
  },
  reducers: {
    getLocation: state => {
      state.loading = true;
    },
    getLocationSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getLocationFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    setLocation: (state, { payload }) => {
      state.data = payload;
    }
  }
});

// Three actions generated from the slice
export const {
  getLocation,
  getLocationSuccess,
  getLocationFailure,
  setLocation
} = currentLocationSlice.actions;

// A selector
export const CurrentLocationSelector = state => state.currentLocation;

// The reducer
export default currentLocationSlice.reducer;

// Asynchronous thunk action
// Get postal code based on coordinates
export function reverseGeocode(coords) {
  return async dispatch => {
    dispatch(getLocation());

    try {
      const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const reverseGC = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${key}`
      );
      const response = await reverseGC.json();
      const postalCode = response.results
        .filter(({ types }) => types.includes("postal_code"))[0]
        .address_components.filter(({ types }) =>
          types.includes("postal_code")
        )[0].long_name;

      dispatch(getLocationSuccess(postalCode));
    } catch (error) {
      dispatch(getLocationFailure(error));
    }
  };
}
