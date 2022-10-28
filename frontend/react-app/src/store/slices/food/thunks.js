import { backendApi } from "../../../api/backendApi";
import { setFoods, startLoadingFoods } from "./foodSlice"

export const getFoods = (page = 0) => {
    if (page < 0) page = 0 // avoid error when page is negative
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());

        // execute call api 
        // const resp = await fetch(`/foods/open?skip=${page*10}&limit=100`);
        // const data = await resp.json();
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open?skip=${page*10}&limit=10`);
        dispatch(setFoods({foods: data, page: page + 1}));
    }
}