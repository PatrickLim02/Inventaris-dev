export const toFormData = (object) =>{
    const formData = new FormData()
    Object.keys(object).forEach(key => {
        if(object[key]){
            formData.append(key, object[key]) // Key : Values
            console.log('Object key: ', Object.keys(object))
        }
    })
    return formData
}

export const paginationConverter = (value) =>{
    const divider = value / 10
    const totalPage = Math.ceil(divider)
    return totalPage;
}