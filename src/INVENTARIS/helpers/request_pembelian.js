import Wrap from './axiosWrapper';


export const getPembelianList = (params = {}) => {
  return Wrap({
    url: '/pembelian',
    method: 'GET',
    params : {...params},
    
  });
};

export const getPembelianPagination = (params = {}) => {
  return Wrap({
    url: '/pembelian/paging',
    method: 'GET',
    params : {...params},
    
  });
};

export const getPembelianLimit = (params = {}, limit) => {
  return Wrap({
    url: '/pembelian/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getPembelianDetail = (params = {}, id) => {
  return Wrap({
    url: '/pembelian/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createPembelian = (data = {}) =>{
  return Wrap({
      url: '/pembelian/create',
      method: 'POST',
      data,
  })
}

export const editPembelian = (data = {}) =>{
  return Wrap({
    url: '/pembelian/edit',
    method: 'POST',
    data,
  })
}

export const deletePembelian = (params ={}, id) =>{
  return Wrap({
    url : '/pembelian/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}


export const getSearchPembelian = (params ={}) =>{
  return Wrap({
    url : '/pembelian/search',
    method: 'GET',
    params: {...params}
  })
}