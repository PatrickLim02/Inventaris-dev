import { combineReducers } from 'redux'
import generalReducer from './generalReducer/generalReducer'
import Authorization from './authorizationReducer/authorizationReducer'

const rootReducer = combineReducers({
  generalReducer: generalReducer,
  Authorization: Authorization 
})



export default rootReducer


