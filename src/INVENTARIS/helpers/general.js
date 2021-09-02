export const toFormData = (object) =>{
    console.log('nama file: ', object)
    console.log()
    const formData = new FormData()
    Object.keys(object).forEach(key => {
        if(object[key]){
            formData.append(key, object[key]) // Key : Values
            console.log('Object key: ', Object.keys(object))
        }
    })
    return formData
}

