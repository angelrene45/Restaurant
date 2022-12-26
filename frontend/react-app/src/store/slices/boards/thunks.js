import Swal from 'sweetalert2'
import { backendApi } from "../../../api";
import { setBoards } from "./boardSlice";

export const getBoards = (page = 0) => {
  return async (dispatch, getState) => {
    // execute call api
    const { data, status, statusText, headers } = await backendApi.get(
      `/boards`
    );
    dispatch(setBoards({ boards: data }));
  };
};

export const postBoards = (boards = []) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
    };
    console.log(boards)
    try {
      // execute call api
      const { data, status, statusText, headers } = await backendApi.post(
        `/boards/multi/`,
        boards,
        config
      );
      dispatch(setCategoriesWithFoods({ categoriesWithFoods: data }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Board saved Succesfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      const { data } = e.response;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.detail,
      });
    }
  };
};

export const updateBoards = (boards = []) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
    };
    try {
      // execute call api
      const { data, status, statusText, headers } = await backendApi.put(
        `/boards/multi/`,
        boards,
        config
      );
      dispatch(setCategoriesWithFoods({ categoriesWithFoods: data }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Board saved Succesfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      const { data } = e.response;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.detail,
      });
    }
  };
};
