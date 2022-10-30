import { backendApi } from "../../../api";
import { setFoods, startLoadingFoods } from "./foodSlice"

export const getFoods = (page = 0) => {
    if (page < 0) page = 0 // avoid error when page is negative
    return async (dispatch, getState) => {
        dispatch(startLoadingFoods());
        // execute call api 
        const { data, status, statusText, headers } = await backendApi.get(`/foods/open?skip=${page*6}&limit=6`);
        dispatch(setFoods({foods: data, page: page}));
    }
}