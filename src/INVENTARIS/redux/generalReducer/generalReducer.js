
import {SET_ASIDE, SET_CABANG, SET_DEPARTMENT, SET_VENDOR, SET_USER, SET_BARANG, SET_PEMBELIAN} from './generalReducerTypes'

const initialState = {
    sidebar : {
        visible: false},

    cabang :{
        data:[]
    },

    department :{
        data:[]
    },

    user :{
        visibleModal: false,
        data:[]
    },

    barang :{
        visibleModal: false,
        data:[]
    },

    vendor :{
        visibleModal: false,
        data:[]       
    },

    pembelian:{
        employeeModalVisible : false,
        barangModalVisible : false,
        vendorModalVisible : false,
        vendorItem:{},
        employeeItem:{},
        barangItem: {},
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

        case SET_BARANG: return {
            ...state,
            barang: {
                ...state.barang,
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
        case SET_PEMBELIAN: return {
            ...state,
            pembelian: {
                ...state.pembelian,
                ...action.payload
            }
        }
        default : return state;

    }
}  

export default generalReducer;