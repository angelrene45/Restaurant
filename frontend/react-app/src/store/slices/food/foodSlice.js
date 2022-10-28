import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState: {
    page: 0,
    foods: [],
    isLoading: false
  },
  reducers: {
    startLoadingFoods: (state) => {
      state.isLoading = true;
    },
    setFoods: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.foods = action.payload.foods;
    },
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingFoods, setFoods } = foodSlice.actions