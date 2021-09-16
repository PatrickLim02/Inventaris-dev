import Wrap from './axiosWrapper';


export const getBarangList = (params = {}) => {
  return Wrap({
    url: '/barang',
    method: 'GET',
    params : {...params},
    
  });
};

export const getBarangPagination = (params = {}) => {
  return Wrap({
    url: '/barang/paging',
    method: 'GET',
    params : {...params},
    
  });
};

export const getBarangLimit = (params = {}, limit) => {
  return Wrap({
    url: '/barang/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getBarangDetail = (params = {}, id) => {
  return Wrap({
    url: '/barang/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createBarang = (data = {}) =>{
  return Wrap({
      url: '/barang/create',
      method: 'POST',
      data,
  })
}

export const editBarang = (data = {}) =>{
  return Wrap({
    url: '/barang/edit',
    method: 'POST',
    data,
  })
}

export const deleteBarang = (params ={}, id) =>{
  return Wrap({
    url : '/barang/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}


export const getSearchBarang = (params ={}) =>{
  return Wrap({
    url : '/barang/search',
    method: 'GET',
    params: {...params}
  })
}