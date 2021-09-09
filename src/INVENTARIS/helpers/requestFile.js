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


export const getMusic = (params = {}) => {  // List Cabang
  return Wrap({
    url: '/music/getFile',
    method: 'GET',
    params : {...params},
  });
};

export const uploadMusic = (body = {}) =>{
  const data = toFormData(body)
  return Wrap({
      url: 'music/submit',
      method: 'POST',
      data,
  })
}