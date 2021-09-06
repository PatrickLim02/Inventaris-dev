
import {SET_AUTHORIZATION} from './authorizationReducerTypes'

const initialState = {
    token : {
        expired: false,
        message: '',
    },


}

const authorizationReducer = (state = initialState, action) =>{
    switch(action.type) {
        case SET_AUTHORIZATION: return {
            ...state,
            token: {
                ...state.sidebar,
                ...action.payload
            }
        }

        default : return state;

    }
}  

export default authorizationReducer;