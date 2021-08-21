import Wrap from './axiosWrapper';


export const getDeptList = (params = {}) => {  // List Cabang
  return Wrap({
    url: '/department',
    method: 'GET',
    params : {...params},
    
  });
};


export const getDepartmentLimit = (params = {}, limit) => {
  return Wrap({
    url: '/department/limit/' + limit,
    method: 'GET',
    params : {...params},
  });
};


export const getDepartmentDetail = (params = {}, id) => {  // Tampilkan Detail
  return Wrap({
    url: '/department/detail/' + id,
    method: 'GET',
    params : {...params},
  });
};

export const createDepartment = (data = {}) =>{
  return Wrap({
      url: '/department/create',
      method: 'POST',
      data,
  })
}

export const editDepartment = (data = {}) =>{  // Edit Department (btn edit)
  return Wrap({
    url: '/department/edit',
    method: 'POST',
    data,
  })
}

export const deleteDepartment = (params ={}, id) =>{
  return Wrap({
    url : '/department/delete/' + id,
    method: 'GET',
    params: {...params}
  })
}

export const getSearchDept = (params ={}) =>{
  return Wrap({
    url : '/department/search',
    method: 'GET',
    params: {...params}
  })
}

