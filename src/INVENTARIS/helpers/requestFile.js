import Wrap from './axiosWrapper';
import {toFormData} from './general'

export const getImage = (params = {}) => {  // List Cabang
    return Wrap({
      url: '/files/getFile',
      method: 'GET',
      params : {...params},
    });
  };

export const uploadImage = (body = {}) =>{
    const data = toFormData(body)
    return Wrap({
        url: 'files/submit',
        method: 'POST',
        data,
    })
}