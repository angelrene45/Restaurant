import { backendApi } from "../../../api";
import { setFoods, startLoadingFoods } from "./foodSlice"
import Swal from 'sweetalert2'

export const getFoods = (page = 0) => {
    if (page < 0) page = 0 // avoid error when page is negative
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open?skip=${page*6}&limit=6`);
        dispatch(setFoods({foods: data, page: page}));
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

            if (status === 200){
                Swal.fire(
                    'Created succesfully',
                    '',
                    'success'
                  )
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.detail,
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