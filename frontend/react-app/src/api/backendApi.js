import axios from 'axios';

// setup backend api that is re-used
export const backendApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
});