import Wrap from './firebaseWrapper'

export const getCabang = (params = {}) =>{
    return Wrap(
        {
            url: '/Cabang',
            method: 'GET',
            params: {...params}
        }       
    )
}


export const createCabang = (data = {}) =>{
    return Wrap(
        {
            url: '/Cabang',
            method: 'POST',
            data: data,
        }       
    )
}

export const editCabang = (params = {}, data ={}) =>{
    return Wrap(
        {
            url: '/Cabang',
            method: 'PUT',
            params: {...params},
            data: data,
        }       
    )
}



export const getDepartment = (params = {}) =>{
    return Wrap(
        {
            url: '/Department',
            method: 'GET',
            params: {...params}
        }       
    )
}


export const createDepartment = (data = {}) =>{
    return Wrap(
        {
            url: '/Department',
            method: 'POST',
            data: data,
        }       
    )
}


export const editDepartment = (params = {}, data ={}) =>{
    return Wrap(
        {
            url: '/Department',
            method: 'PUT',
            params: {...params},
            data: data,
        }       
    )
}

export const getUser = (params = {}) =>{
    return Wrap(
        {
            url: '/User',
            method: 'GET',
            params: {...params}
        }       
    )
}

export const createUser = (data = {}) =>{
    return Wrap(
        {
            url: '/User',
            method: 'POST',
            data: data,
        }       
    )
}


export const editUser = (params = {}, data ={}) =>{
    return Wrap(
        {
            url: '/User',
            method: 'PUT',
            params: {...params},
            data: data,
        }       
    )
}

export const getVendor = (params = {}) =>{
    return Wrap(
        {
            url: '/Vendor',
            method: 'GET',
            params: {...params}
        }       
    )
}

export const createVendor = (data = {}) =>{
    return Wrap(
        {
            url: '/Vendor',
            method: 'POST',
            data: data,
        }       
    )
}


export const editVendor = (params = {}, data ={}) =>{
    return Wrap(
        {
            url: '/Vendor',
            method: 'PUT',
            params: {...params},
            data: data,
        }       
    )
}