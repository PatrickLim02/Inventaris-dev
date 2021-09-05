import {SET_ASIDE, SET_CABANG, SET_DEPARTMENT, SET_USER, SET_VENDOR} from './generalReducerTypes'
import {getDepartment, getVendor} from '../../helpers/requestFirebase'
import {getCabangList} from '../../helpers/requestCabang'
import {getDeptList} from '../../helpers/requestDept'
import {getUserList} from '../../helpers/requestEmployee'
import { getVendorList } from '../../helpers/requestVendor'
import { useHistory } from 'react-router'
import Login from '../../screens/Login'

export const setAside = (payload) => {
  return {
    type: SET_ASIDE,
    payload,
  }
}

export const setCabang = (payload) => {
  return {
    type: SET_CABANG,
    payload,
  }
}

export const fetchCabangFromBackEndToRedux = () => {
    return async(dispatch) =>{
      
      const res = await getCabangList()
        dispatch(setCabang(res))
    //   getCabangList({}).then((res) => {
    //     if(res.status === 400){
    //       return <Login />
    //     }
    //     else{
    //       dispatch(setCabang(res))
    //       console.log('Berhasil')
    //     }
        
    //   })
    //   .catch((err)=>{
        
    //     console.log('token invalid errr', err)
    //     return <Login />
       
    //   })
    // }
}
}

export const setDepartment = (payload) => {
  return {
    type: SET_DEPARTMENT,
    payload,
  }
}

export const fetchDepartmentFromBackEndToRedux = () => {
  return async(dispatch) =>{
    const res = await getDeptList()
      dispatch(setDepartment(res))
  }
}

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  }
}

export const fetchUserFromBackEndToRedux = () =>{
  return async(dispatch) =>{
    const res = await getUserList()
      dispatch(setUser(res))
  }
}

export const setVendor = (payload) => {
  return {
    type: SET_VENDOR,
    payload,
  }
}

export const fetchVendorFromBackEndToRedux = () =>{
  return async(dispatch) =>{
    const res = await getVendorList()
      dispatch(setVendor(res))
  }
}

