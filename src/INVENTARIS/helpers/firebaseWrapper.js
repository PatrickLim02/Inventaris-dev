import firebase from '../../firebaseAPI'

const request = async function (options) {
    console.log('options Data:' ,options)
    const method = options.method
    const params = options.params ? Object.entries(options.params) : '';
    const url = options.url // nama table di firebase ; Jika axios, ini adalah endpoint
    const url_params = params?.length === 0 ? '' : '/' + params[0][1]
    const referensi = url + url_params
    let client = null;
    
    if (method === 'GET'){
        client = firebase.database().ref(referensi).once('value');
        console.log(client)
    }
    if (method === 'POST'){ // untuk Create
        client = firebase.database().ref(referensi).push(options.data);
    }
    if (method === 'PUT'){ // untuk Create
        client = firebase.database().ref(referensi).set(options.data);
    }
    // const onSuccess = function (response) {
    //     return response.val()
    // }
    const onSuccess = (response) =>{
        return response.val()
    }
    const onError = function (error) {
        console.log('Request Failed: ', error)
    }
    return client.then(onSuccess).catch(onError)

}

export default request