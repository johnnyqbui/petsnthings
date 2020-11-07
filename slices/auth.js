import { createSlice } from "@reduxjs/toolkit";

// A slice for Auth with our three reducers
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    hasErrors: false,
    authData: {}
  },
  reducers: {
    getAuthData: state => {
      state.loading = true;
    },
    authSuccess: (state, { payload }) => {
      state.authData = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    authFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// Three actions generated from the slice
export const { getAuthData, authSuccess, authFailure } = AuthSlice.actions;

// The reducer
export default AuthSlice.reducer;

// A selector
export const AuthSelector = state => state.auth;

// Asynchronous thunk action
export function authenticate() {
  return async dispatch => {
    dispatch(getAuthData());
    const key = process.env.NEXT_PUBLIC_PETFINDER_KEY;
    const secret = process.env.NEXT_PUBLIC_PETFINDER_SECRET;

    try {
      const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const data = await res.json();

      dispatch(authSuccess(data));
    } catch (error) {
      dispatch(authFailure());
    }
  };
}
