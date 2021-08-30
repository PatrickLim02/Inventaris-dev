 import axios from 'axios';
 import {MAIN_API} from './constants';


 const request = async function (options) {
   const requestHeaders = options.customHeaders || {
     'Content-type': 'application/json',
     Accept: 'application/json',
   };
   let tokenParam = {
     'x-access-token' : `Bearer ${localStorage.getItem('token')}`
   }
   const client = axios.create({
     baseURL: options.MAIN_URL || MAIN_API,
     headers: {...requestHeaders, ...tokenParam}
   });
   const onSuccess = function (response) {
        return response.data;
   };
 
   const onError = function (error) {
     console.log('Request Failed:', error.config);
     return Promise.reject(error.response || error.message);
   };
 
   return client(options).then(onSuccess).catch(onError)
 };
 
 
 export default (request);
 