import {SET_AUTHORIZATION} from './authorizationReducerTypes'

import {getCabangList} from '../../helpers/requestCabang'

export const setAuthorization = (payload) => {
  return {
    type: SET_AUTHORIZATION,
    payload,
  }
}



