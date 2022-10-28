import axios from 'axios';
import { getEnvVariables } from '../utils'

// base api url from .env file
const { API_URL } = getEnvVariables()


// setup backend api that is re-used
const backendApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/' 
});


// setup interceptors
backendApi.interceptors.request.use( config => {
    
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
    }


    return config;
});


export default backendApi;