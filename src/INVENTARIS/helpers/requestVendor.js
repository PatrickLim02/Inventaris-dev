import Wrap from './axiosWrapper';


export const getVendorList = (params = {}) => {
  return Wrap({
    url: '/vendor',
    method: 'GET',
    params : {...params},
    
  });
};


export const getVendorLimit = (params = {}, limit) => {
  return Wrap({
    url: '/vendor/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getVendorDetail = (params = {}, id) => {
  return Wrap({
    url: '/vendor/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createVendor = (data = {}) =>{
  return Wrap({
      url: '/vendor/create',
      method: 'POST',
      data,
  })
}

export const editVendor = (data = {}) =>{
  return Wrap({
    url: '/vendor/edit',
    method: 'POST',
    data,
  })
}

export const deleteVendor = (params ={}, id) =>{
  return Wrap({
    url : '/vendor/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}


export const getSearchVendor = (params ={}) =>{
  return Wrap({
    url : '/vendor/search',
    method: 'GET',
    params: {...params}
  })
}