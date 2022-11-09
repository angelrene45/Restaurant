import { backendApi } from "../../../api";
import { startLoadingCategories, setCategories, setCategoriesWithFoods } from "./categoriesSlice"

export const getCategories = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCategories());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/categories/open?skip=${page}`);
        dispatch(setCategories({categories: data}));
    }
}

export const getCategoriesWithFoods = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCategories());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/categories/foods/open?skip=${page}`);
        dispatch(setCategoriesWithFoods({categoriesWithFoods: data}));
    }
}