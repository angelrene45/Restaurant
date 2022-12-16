import { backendApi } from "../../../api";
import { setBoards } from "./boardSlice"

export const getBoards = (page = 0) => {
    return async (dispatch, getState) => {
        
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/boards`);
        console.log(data)
        dispatch(setBoards({boards: data}));
    }
}

export const getCategoriesWithFoods = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCategories());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.post(`/post`);
        dispatch(setCategoriesWithFoods({categoriesWithFoods: data}));
    }
}