import Wrap from './axiosWrapper';

export const getAccessToken = (data = {}) =>{
    return Wrap({
      url: '/tokengenerator',
      method: 'POST',
      data,
    })
  }

  export const loginUser = (data = {}) =>{
    return Wrap({
      url: 'userlogin/verifylogin',
      method: 'POST',
      data,
    })
  }