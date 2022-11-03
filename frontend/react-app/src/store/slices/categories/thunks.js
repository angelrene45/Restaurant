import { backendApi } from "../../../api";
import { setCategories } from "./categoriesSlice"

export const getCategories = (page = 0) => {
    return async (dispatch, getState) => {
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/categories/open?skip=${page}`);
        dispatch(setCategories({categories: data}));
    }
}