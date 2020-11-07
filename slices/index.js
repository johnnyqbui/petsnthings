import { combineReducers } from 'redux'

import authReducer from './auth'
import petsReducer from './pets'
import currentLocationReducer from './currentLocation'

const rootReducer = combineReducers({
  auth: authReducer,
  pets: petsReducer,
  currentLocation: currentLocationReducer
})

export default rootReducer