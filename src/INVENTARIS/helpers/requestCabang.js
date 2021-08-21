import Wrap from './axiosWrapper';


export const getCabangList = (params = {}) => {
  return Wrap({
    url: '/cabang',
    method: 'GET',
    params : {...params},
    
  });
};


export const getCabangLimit = (params = {}, limit) => {
  return Wrap({
    url: '/cabang/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getCabangDetail = (params = {}, id) => {
  return Wrap({
    url: '/cabang/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createCabang = (data = {}) =>{
  return Wrap({
      url: '/cabang/create',
      method: 'POST',
      data,
  })
}

export const editCabang = (data = {}) =>{
  return Wrap({
    url: '/cabang/edit',
    method: 'POST',
    data,
  })
}

export const deleteCabang = (params ={}, id) =>{
  return Wrap({
    url : '/cabang/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}


export const getSearchCabang = (params ={}) =>{
  return Wrap({
    url : '/cabang/search',
    method: 'GET',
    params: {...params}
  })
}