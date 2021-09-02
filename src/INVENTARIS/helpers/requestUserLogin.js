import Wrap from './axiosWrapper';


export const getUserLoginList = (params = {}) => {
  return Wrap({
    url: '/userlogin',
    method: 'GET',
    params : {...params},
    
  });
};


export const getUserLimit = (params = {}, limit) => {
  return Wrap({
    url: '/user/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getUserDetail = (params = {}, id) => {
  return Wrap({
    url: '/user/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createUserLogin = (data = {}) =>{
  return Wrap({
      url: '/userlogin/create',
      method: 'POST',
      data,
  })
}

export const editUser = (data = {}) =>{
  return Wrap({
    url: '/user/edit',
    method: 'POST',
    data,
  })
}

export const deleteUser = (params ={}, id) =>{
  return Wrap({
    url : '/user/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}

export const getAttr = (params = {}) =>{
  return Wrap({
    url: '/attributeUser',
    method: 'GET',
    params: {...params}
  })
}

export const getSearchUser = (params = {}) =>{
  return Wrap({
    url: '/user/search',
    method: 'GET',
    params: {...params}
  })
}
