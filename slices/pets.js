import { createSlice } from "@reduxjs/toolkit";

// A slice for Pets with our three reducers
const PetsSlice = createSlice({
  name: "pets",
  initialState: {
    loading: false,
    hasErrors: false,
    data: []
  },
  reducers: {
    getPets: state => {
      state.loading = true;
    },
    getPetsSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPetsFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// Three actions generated from the slice
const { getPets, getPetsSuccess, getPetsFailure } = PetsSlice.actions;

// A selector
export const PetsSelector = state => state.pets;

// The reducer
export default PetsSlice.reducer;

// Asynchronous thunk action
export const fetchPets = (authData, location) => async dispatch => {
  dispatch(getPets());

  try {
    const queryParams = encodeURI(location);
    const type = "cat";
    const sort = "distance";
    const apiURL = `https://api.petfinder.com/v2/animals?location=${queryParams}&type=${type}&sort=${sort}`;

    const petResp = await fetch(apiURL, {
      headers: {
        Authorization: `${authData.token_type} ${authData.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const petsData = await petResp.json();

    dispatch(getPetsSuccess(petsData));
  } catch (error) {
    dispatch(getPetsFailure());
  }
};
