
import {SET_ASIDE, SET_CABANG, SET_DEPARTMENT, SET_VENDOR, SET_USER} from './generalReducerTypes'

const initialState = {
    sidebar : {
        visible: false,
    },

    cabang :{
        
    }

    ,

    department :{
       
    }

    ,

    user :{

    }
    ,

    vendor :{
        data:[
           
        ]
    }
}

const generalReducer = (state = initialState, action) =>{
    switch(action.type) {
        case SET_ASIDE: return {
            ...state,
            sidebar: {
                ...state.sidebar,
                ...action.payload
            }
        }


        case SET_CABANG: return {
            ...state,
            cabang: {
                ...state.cabang,
                ...action.payload
            }
        }

        case SET_DEPARTMENT: return {
            ...state,
            department: {
                ...state.department,
                ...action.payload
            }
        }

        case SET_USER: return{
            ...state,
            user: {
                ...state.user,
                ...action.payload
            }
        }

        case SET_VENDOR: return {
            ...state,
            vendor: {
                ...state.vendor,
                ...action.payload
            }
        }
        default : return state;

    }
}  

export default generalReducer;