import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  petsLoading: false,
  hasErrors: false,
  pets: [],
}

// A slice for Pets with our three reducers
const PetsSlice = createSlice({
  name: 'Pets',
  initialState,
  reducers: {
    getPets: state => {
      state.petsLoading = true
    },
    getPetsSuccess: (state, { payload }) => {
      state.Pets = payload
      state.petsLoading = false
      state.hasErrors = false
    },
    getPetsFailure: state => {
      state.petsLoading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getPets, getPetsSuccess, getPetsFailure } = PetsSlice.actions

// A selector
export const PetsSelector = state => state.Pets

// The reducer
export default PetsSlice.reducer

// Asynchronous thunk action
export function fetchPets() {
  return async dispatch => {
    dispatch(getPets())

    try {
      const queryParams = encodeURI("Fort Worth, TX");
      const type = "cat";
      const sort = "distance";
      const apiURL = `https://api.petfinder.com/v2/animals?location=${queryParams}&type=${type}&sort=${sort}`;
    
      const petResp = await fetch(
        apiURL,
          {
            headers: {
                Authorization: `${data.token_type} ${data.access_token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
          }
      );
    
      const petsData = await petResp.json();

      dispatch(getPetsSuccess(petsData))
    } catch (error) {
      dispatch(getPetsFailure())
    }
  }
}