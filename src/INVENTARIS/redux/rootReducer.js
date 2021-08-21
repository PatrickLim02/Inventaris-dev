import { combineReducers } from 'redux'
import generalReducer from './generalReducer/generalReducer'

const rootReducer = combineReducers({
  generalReducer: generalReducer,
})

export default rootReducer


