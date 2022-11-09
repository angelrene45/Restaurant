import { backendApi } from "../../../api";
import { setFoods, startLoadingFoods, setFood } from "./foodSlice"
import Swal from 'sweetalert2'

export const getFoods = (page = 0) => {
    if (page < 0) page = 0 // avoid error when page is negative
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open`);
        dispatch(setFoods({foods: data, page: page}));
    }
}
export const getFood = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open/${id}`);
        dispatch(setFood({food: data}));
    }
}

export const getFoodsByTerm = (term = "", page=0) => {
    if (page < 0) page = 0 // avoid error when page is negative
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open/search/${term}?skip=${page*100}&limit=100`);
        dispatch(setFoods({foods: data, page: 0}));
    }
}

export const createFood = (formData) => {
    return async (dispatch, getState) => {

        const config = {
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept': 'application/json'
            }
        };
        
        // execute call api 
        try {
            const { data, status, statusText, headers } = await backendApi.post(`/foods/`,formData,config);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Created Succesfully',
                showConfirmButton: false,
                timer: 1500
              })

        } catch(e) {
            const { data } = e.response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
            })
        }
    }
}
export const updateFood = (formData, id) => {
    return async (dispatch, getState) => {

        const config = {
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept': 'application/json'
            }
        };
        
        // execute call api 
        try {
            const { data, status, statusText, headers } = await backendApi.put(`/foods/${id}`, formData, config);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Updated Succesfully',
                showConfirmButton: false,
                timer: 1500
              })

        } catch(e) {
            const { data } = e.response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
            })
        }
    }
}
export const deleteFood = (id) => {
    return async (dispatch, getState) => {

        const config = {
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Accept': 'application/json'
            }
        };
        
        // execute call api 
        try {
            console.log(id)
            //const { data, status, statusText, headers } = await backendApi.post(`/foods/`,formData,config);
            Swal.fire(
                'Created succesfully',
                '',
                'success'
                )

        } catch(e) {
            const { data } = e.response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
            })
        }
    }
}